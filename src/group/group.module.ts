import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Course } from "../courses/entities/course.entity";
import { CoursesModule } from "../courses/courses.module";
import { Schedule } from "../schedules/entities/schedule.entity";
import { Homework } from "../homeworks/entities/homework.entity";
import { Lid } from "../lid/entities/lid.entity";
import { Payment } from "../payments/entities/payment.entity";
import { Exam } from "../exams/entities/exam.entity";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Student } from "../student/entities/student.entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      Course,
      Schedule,
      Homework,
      Lid,
      Payment,
      Exam,
      Teacher,
      Student,
    ]),
    CoursesModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
