import { Module } from "@nestjs/common";
import { BranchesService } from "./branches.service";
import { BranchesController } from "./branches.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Branch } from "./entities/branch.entity";
import { BranchResolver } from "./branches.resolver";
import { Room } from "../rooms/entities/room.entity";
import { Admin } from "../admin/entities/admin.entity";
import { Event } from "../events/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Room, Admin, Event])],
  controllers: [BranchesController],
  providers: [BranchesService, BranchResolver],
  exports: [BranchesService],
})
export class BranchesModule {}
