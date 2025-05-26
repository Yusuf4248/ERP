import { Injectable } from "@nestjs/common";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "./entities/schedule.entity";
import { Repository } from "typeorm";

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>
  ) {}
  create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepo.save(createScheduleDto);
  }

  findAll() {
    return this.scheduleRepo.find();
  }

  findOne(id: number) {
    return this.scheduleRepo.findOneBy({ id });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepo.update({ id }, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepo.delete(id);
  }
}
