import { Module } from "@nestjs/common";
import { ExamsService } from "./exams.service";
import { ExamsController } from "./exams.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./entities/exam.entity";
import { Group } from "../group/entities/group.entity";
import { Room } from "../rooms/entities/room.entity";
import { RoomsModule } from "../rooms/rooms.module";
import { GroupModule } from "../group/group.module";
import { Teacher } from "../teacher/entities/teacher.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam, Group, Room, Teacher]),
    RoomsModule,
    GroupModule,
    JwtModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
