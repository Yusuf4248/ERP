import { Module } from "@nestjs/common";
import { StudentGroupsService } from "./student-groups.service";
import { StudentGroupsController } from "./student-groups.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student-group.entity";

import { GroupModule } from "../group/group.module";
import { Group } from "../group/entities/group.entity";
import { StudentGroupsResolver } from "./student-groups.resolver";
import { Student } from "../student/entities/student.entities";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentGroup, Student, Group]),
    StudentModule,
    GroupModule,
  ],
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService, StudentGroupsResolver],
})
export class StudentGroupsModule {}
