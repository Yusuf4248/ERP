import { Module } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { TeacherResolver } from "./teacher.resolver";
import { TeacherGroup } from "../teacher-groups/entities/teacher-group.entity";
import { Homework } from "../homeworks/entities/homework.entity";
import { Grade } from "../grades/entities/grade.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherGroup, Homework, Grade])],
  controllers: [TeacherController],
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
