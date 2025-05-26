import { Module } from "@nestjs/common";
import { TeacherGroupsService } from "./teacher-groups.service";
import { TeacherGroupsController } from "./teacher-groups.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherGroup } from "./entities/teacher-group.entity";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Group } from "../group/entities/group.entity";
import { TeacherModule } from "../teacher/teacher.module";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherGroup, Teacher, Group]),
    TeacherModule,
    GroupModule,
  ],
  controllers: [TeacherGroupsController],
  providers: [TeacherGroupsService],
})
export class TeacherGroupsModule {}
