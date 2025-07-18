import { Module } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attendance } from "./entities/attendance.entity";
import { AttendanceResolver } from "./attendance.resolver";
import { Student } from "../student/entities/student.entities";
import { StudentModule } from "../student/student.module";
import { JwtModule } from "@nestjs/jwt";
import { LessonsModule } from "../lessons/lessons.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, Student]),
    StudentModule,
    LessonsModule,
    JwtModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceResolver],
})
export class AttendanceModule {}
