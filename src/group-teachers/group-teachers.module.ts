import { Module } from "@nestjs/common";
import { GroupTeachersService } from "./group-teachers.service";
import { GroupTeachersController } from "./group-teachers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupTeacher } from "./entities/group-teacher.entity";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Group } from "../group/entities/group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GroupTeacher, Teacher, Group])],
  controllers: [GroupTeachersController],
  providers: [GroupTeachersService],
})
export class GroupTeachersModule {}
