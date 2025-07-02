import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "./entities/schedule.entity";
import { Repository } from "typeorm";
import { RoomsService } from "../rooms/rooms.service";
import { GroupService } from "../group/group.service";

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
    private readonly roomService: RoomsService,
    private readonly groupService: GroupService
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    const { room } = await this.roomService.findOne(createScheduleDto.roomId);
    const { group } = await this.groupService.findOne(
      createScheduleDto.groupId
    );
    const newSchedule = await this.scheduleRepo.save({
      room,
      group,
      ...createScheduleDto,
    });
    return {
      message: "New schedule created!",
      success: true,
      newSchedule,
    };
  }

  async findAll() {
    const schedules = await this.scheduleRepo.find({
      relations: ["room", "group"],
    });
    return {
      message: "All schedules",
      success: true,
      schedules,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ["room", "group"],
    });
    if (!schedule) {
      throw new NotFoundException(`${id}-schedule not found`);
    }
    return {
      message: `${id}-schedule`,
      success: true,
      schedule,
    };
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    await this.findOne(id);
    await this.scheduleRepo.update(id, updateScheduleDto);
    const { ...updated_schedule } = await this.findOne(id);

    return {
      message: `${id}-schedule data updated!`,
      success: true,
      updated_schedule,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.scheduleRepo.delete(id);

    return {
      message: `${id}-schedule deleted!`,
      success: true,
    };
  }
}
