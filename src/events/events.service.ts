import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { Repository } from "typeorm";
import { BranchesService } from "../branches/branches.service";
import { FilterEventDto } from "./dto/filter-event.dto";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    private readonly branchService: BranchesService
  ) {}
  async create(createEventDto: CreateEventDto) {
    const branch = await this.branchService.findOne(createEventDto.branchId);
    const newEvent = await this.eventRepo.save({
      ...createEventDto,
      branch: branch.branch,
    });
    return {
      message: "New event created!",
      success: true,
      newEvent,
    };
  }

  async findAll() {
    const events = await this.eventRepo.find({ relations: ["branch"] });
    if (events.length == 0) {
      throw new NotFoundException("Events not found");
    }
    return {
      message: "All events",
      success: true,
      events,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const event = await this.eventRepo.findOne({
      where: { id },
      relations: ["branch"],
    });
    if (!event) {
      throw new NotFoundException(`${id}-event not found`);
    }
    return {
      message: `${id}-event`,
      success: true,
      event,
    };
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.eventRepo.update({ id }, updateEventDto);

    const event = await this.findOne(id);
    return {
      message: `${id}-event data updated!`,
      success: true,
      event: event.event,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.eventRepo.delete(id);

    return {
      message: `${id}-event deleted!`,
      success: true,
    };
  }

  async findByDateRange(dto: FilterEventDto): Promise<Event[]> {
    const { start, end } = dto;
    return this.eventRepo
      .createQueryBuilder("event")
      .where(
        `
        (event.start_time BETWEEN :start AND :end)
         OR (event.end_time BETWEEN :start AND :end)
         OR (event.start_time <= :start AND event.end_time >= :end)
      `,
        { start, end }
      )
      .getMany();
  }

  async findByStatus(dto: FilterEventDto): Promise<Event[]> {
    const { is_active } = dto;
    return this.eventRepo.find({ where: { is_active } });
  }
}
