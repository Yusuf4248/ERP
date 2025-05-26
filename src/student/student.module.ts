import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { Student } from "./entities/student.entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentResolver } from "./student.resolver";
import { Attendance } from "../attendance/entities/attendance.entity";
import { StudentGroup } from "../student-groups/entities/student-group.entity";
import { TeacherGroup } from "../teacher-groups/entities/teacher-group.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Attendance, StudentGroup, TeacherGroup]),
  ],
  controllers: [StudentController],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
