import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { Branch } from "../branches/entities/branch.entity";
import { BranchesModule } from "../branches/branches.module";
import { EventsResolver } from "./events.resolver";
import { Student } from "../student/entities/student.entities";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Branch, Student]), BranchesModule],
  controllers: [EventsController],
  providers: [EventsService, EventsResolver],
  exports: [EventsService],
})
export class EventsModule {}
