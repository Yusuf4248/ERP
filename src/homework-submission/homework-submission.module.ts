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
import { JwtModule } from "@nestjs/jwt";
import { Media } from "../media/entities/media.entity";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HomeworkSubmission,
      Student,
      Homework,
      Grade,
      Media,
    ]),
    StudentModule,
    HomeworksModule,
    JwtModule,
    FileModule,
  ],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService, HomeworkSubmissionResolver],
  exports: [HomeworkSubmissionService],
})
export class HomeworkSubmissionModule {}
