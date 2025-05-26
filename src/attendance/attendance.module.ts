import { Module } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attendance } from "./entities/attendance.entity";
import { AttendanceResolver } from "./attendance.resolver";
import { Student } from "../student/entities/student.entities";
import { Schedule } from "../schedules/entities/schedule.entity";
import { StudentModule } from "../student/student.module";
import { SchedulesModule } from "../schedules/schedules.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, Student, Schedule]),
    StudentModule,
    SchedulesModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceResolver],
})
export class AttendanceModule {}
