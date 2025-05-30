import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { Student } from "./entities/student.entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentResolver } from "./student.resolver";
import { Attendance } from "../attendance/entities/attendance.entity";
import { StudentGroup } from "../student-groups/entities/student-group.entity";
import { TeacherGroup } from "../teacher-groups/entities/teacher-group.entity";
import { HomeworkSubmission } from "../homework-submission/entities/homework-submission.entity";
import { Grade } from "../grades/entities/grade.entity";
import { Lid } from "../lid/entities/lid.entity";
import { LidModule } from "../lid/lid.module";
import { EventParticipant } from "../event-participant/entities/event-participant.entity";
import { Payment } from "../payments/entities/payment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Attendance,
      StudentGroup,
      TeacherGroup,
      HomeworkSubmission,
      Grade,
      Lid,
      EventParticipant,
      Payment,
    ]),
    LidModule,
  ],
  controllers: [StudentController],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
