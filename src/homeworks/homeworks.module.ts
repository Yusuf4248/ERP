import { Module } from "@nestjs/common";
import { HomeworksService } from "./homeworks.service";
import { HomeworksController } from "./homeworks.controller";
import { Homework } from "./entities/homework.entity";
import { Group } from "../group/entities/group.entity";
import { Teacher } from "../teacher/entities/teacher.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupModule } from "../group/group.module";
import { TeacherModule } from "../teacher/teacher.module";
import { HomeworkSubmission } from "../homework-submission/entities/homework-submission.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Homework, Group, Teacher, HomeworkSubmission]),
    GroupModule,
    TeacherModule,
    JwtModule,
  ],
  controllers: [HomeworksController],
  providers: [HomeworksService],
  exports: [HomeworksService],
})
export class HomeworksModule {}
