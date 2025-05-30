import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventParticipant } from "./entities/event-participant.entity";
import { CreateEventParticipantDto } from "./dto/create-event-participant.dto";
import { UpdateEventParticipantDto } from "./dto/update-event-participant.dto";
import { EventsService } from "../events/events.service";
import { StudentService } from "../student/student.service";

@Injectable()
export class EventParticipantService {
  constructor(
    @InjectRepository(EventParticipant)
    private readonly eventParticipantRepo: Repository<EventParticipant>,
    private readonly eventService: EventsService,
    private readonly studentService: StudentService
  ) {}

  async create(createDto: CreateEventParticipantDto) {
    const student = await this.studentService.findOne(createDto.student_id);
    const event = await this.eventService.findOne(createDto.event_id);
    const ep = await this.eventParticipantRepo.save({
      student: student.student,
      event: event.event,
      ...createDto,
    });
    return {
      message: "New event participant created",
      success: true,
      ep,
    };
  }

  async findAll() {
    const ep = await this.eventParticipantRepo.find({
      relations: ["student", "event"],
    });
    if (ep.length == 0) {
      throw new NotFoundException("Event participant not found");
    }
    return {
      message: "All event participants",
      success: true,
      ep,
    };
  }

  async findOne(student_id: number, event_id: number) {
    const student = await this.studentService.findOne(student_id);
    const event = await this.eventService.findOne(event_id);
    const ep = await this.eventParticipantRepo.findOne({
      where: { student: student.student, event: event.event },
      relations: ["student", "event"],
    });

    if (!ep) {
      throw new NotFoundException("Event participant not found");
    }

    return {
      message: "Event participants",
      success: true,
      ep,
    };
  }

  async update(updateDto: UpdateEventParticipantDto) {
    const { student_id, event_id, status } = updateDto;

    const { ep } = await this.findOne(student_id!, event_id!);
    ep.status = status!;

    const updated_ep = await this.eventParticipantRepo.save(ep);

    return {
      message: "Event participant data updated",
      success: true,
      updated_ep,
    };
  }

  async remove(student_id: number, event_id: number) {
    const { ep } = await this.findOne(student_id!, event_id!);
    await this.eventParticipantRepo.delete(ep);
    return "Event participant deleted";
  }
}
