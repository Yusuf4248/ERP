import { Module } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { TeacherResolver } from "./teacher.resolver";
import { Homework } from "../homeworks/entities/homework.entity";
import { Grade } from "../grades/entities/grade.entity";
import { Exam } from "../exams/entities/exam.entity";
import { ExamsModule } from "../exams/exams.module";
import { Group } from "../group/entities/group.entity";
import { Branch } from "../branches/entities/branch.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Homework, Grade, Exam, Group, Branch]),
  ],
  controllers: [TeacherController],
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
