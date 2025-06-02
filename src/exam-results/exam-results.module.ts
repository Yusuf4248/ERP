import { Module } from "@nestjs/common";
import { ExamResultsService } from "./exam-results.service";
import { ExamResultsController } from "./exam-results.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExamResult } from "./entities/exam-result.entity";
import { Exam } from "../exams/entities/exam.entity";
import { Student } from "../student/entities/student.entities";
import { ExamsModule } from "../exams/exams.module";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamResult, Exam, Student]),
    ExamsModule,
    StudentModule,
  ],
  controllers: [ExamResultsController],
  providers: [ExamResultsService],
})
export class ExamResultsModule {}
