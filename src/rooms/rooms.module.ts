import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./entities/room.entity";
import { Branch } from "../branches/entities/branch.entity";
import { BranchesModule } from "../branches/branches.module";
import { RoomResolver } from "./rooms.resolver";
import { Schedule } from "../schedules/entities/schedule.entity";
import { Exam } from "../exams/entities/exam.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Branch, Schedule, Exam]),
    BranchesModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomResolver],
  exports: [RoomsService],
})
export class RoomsModule {}
