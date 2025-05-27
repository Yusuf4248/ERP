import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Course } from "../courses/entities/course.entity";
import { CoursesModule } from "../courses/courses.module";
import { Schedule } from "../schedules/entities/schedule.entity";
import { StudentGroup } from "../student-groups/entities/student-group.entity";
import { TeacherGroup } from "../teacher-groups/entities/teacher-group.entity";
import { Homework } from "../homeworks/entities/homework.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      Course,
      Schedule,
      StudentGroup,
      TeacherGroup,
      Homework,
    ]),
    CoursesModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
