import { Module } from "@nestjs/common";
import { HomeworkSubmissionService } from "./homework-submission.service";
import { HomeworkSubmissionController } from "./homework-submission.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { Student } from "../student/entities/student.entities";
import { Homework } from "../homeworks/entities/homework.entity";
import { StudentModule } from "../student/student.module";
import { HomeworksModule } from "../homeworks/homeworks.module";
import { Grade } from "../grades/entities/grade.entity";
import { HomeworkSubmissionResolver } from "./homework-submission.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeworkSubmission, Student, Homework, Grade]),
    StudentModule,
    HomeworksModule,
  ],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService, HomeworkSubmissionResolver],
  exports: [HomeworkSubmissionService],
})
export class HomeworkSubmissionModule {}
