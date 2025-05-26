import { Module } from "@nestjs/common";
import { SchedulesService } from "./schedules.service";
import { SchedulesController } from "./schedules.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./entities/schedule.entity";
import { Group } from "../group/entities/group.entity";
import { Attendance } from "../attendance/entities/attendance.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Group, Attendance])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
