import { Module } from "@nestjs/common";
import { EventParticipantService } from "./event-participant.service";
import { EventParticipantController } from "./event-participant.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventParticipant } from "./entities/event-participant.entity";
import { Event } from "../events/entities/event.entity";
import { Student } from "../student/entities/student.entities";
import { EventParticipantResolver } from "./event-participant.resolver";
import { EventsModule } from "../events/events.module";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([EventParticipant, Event, Student]),
    EventsModule,
    StudentModule,
  ],
  controllers: [EventParticipantController],
  providers: [EventParticipantService, EventParticipantResolver],
})
export class EventParticipantModule {}
