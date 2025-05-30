import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { EventParticipantService } from "./event-participant.service";
import { EventParticipant } from "./entities/event-participant.entity";
import { CreateEventParticipantDto } from "./dto/create-event-participant.dto";
import { UpdateEventParticipantDto } from "./dto/update-event-participant.dto";

@Resolver(() => EventParticipant)
export class EventParticipantResolver {
  constructor(
    private readonly eventParticipantService: EventParticipantService
  ) {}

  @Mutation(() => EventParticipant)
  createEventParticipant(
    @Args("createEventParticipantDto") createDto: CreateEventParticipantDto
  ) {
    return this.eventParticipantService.create(createDto);
  }

  @Query(() => [EventParticipant], { name: "eventParticipants" })
  findAll() {
    return this.eventParticipantService.findAll();
  }

  @Query(() => EventParticipant, { name: "eventParticipant" })
  findOne(
    @Args("student_id", { type: () => Number }) student_id: number,
    @Args("event_id", { type: () => Number }) event_id: number
  ) {
    return this.eventParticipantService.findOne(student_id, event_id);
  }

  @Mutation(() => EventParticipant)
  updateEventParticipant(
    @Args("updateEventParticipantDto") updateDto: UpdateEventParticipantDto
  ) {
    return this.eventParticipantService.update(updateDto);
  }

  @Mutation(() => Boolean)
  removeEventParticipant(
    @Args("student_id", { type: () => Number }) student_id: number,
    @Args("event_id", { type: () => Number }) event_id: number
  ) {
    return this.eventParticipantService
      .remove(student_id, event_id)
      .then(() => true);
  }
}
