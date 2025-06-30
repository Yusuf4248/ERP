import { Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { Group } from "../group/entities/group.entity";
import { Schedule } from "../schedules/entities/schedule.entity";
import { JwtModule } from "@nestjs/jwt";
import { GroupModule } from "../group/group.module";
import { SchedulesModule } from "../schedules/schedules.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Group, Schedule]),
    JwtModule,
    GroupModule,
    SchedulesModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
