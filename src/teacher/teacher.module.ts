import { Module } from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { TeacherResolver } from "./teacher.resolver";
import { TeacherGroup } from "../teacher-groups/entities/teacher-group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherGroup])],
  controllers: [TeacherController],
  providers: [TeacherResolver, TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
