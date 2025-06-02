import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { Student } from "./entities/student.entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentResolver } from "./student.resolver";
import { Attendance } from "../attendance/entities/attendance.entity";
import { HomeworkSubmission } from "../homework-submission/entities/homework-submission.entity";
import { Grade } from "../grades/entities/grade.entity";
import { Lid } from "../lid/entities/lid.entity";
import { LidModule } from "../lid/lid.module";
import { Payment } from "../payments/entities/payment.entity";
import { Group } from "../group/entities/group.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Attendance,
      HomeworkSubmission,
      Grade,
      Lid,
      Payment,
      Event,
      Group,
    ]),
    LidModule,
  ],
  controllers: [StudentController],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
