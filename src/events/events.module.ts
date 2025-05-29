import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { Branch } from "../branches/entities/branch.entity";
import { BranchesModule } from "../branches/branches.module";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Branch]), BranchesModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
