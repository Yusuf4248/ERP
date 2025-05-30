import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EventsService } from "./events.service";
import { Event } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { FilterEventDto } from "./dto/filter-event.dto";

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createEvent(@Args("createEventDto") createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Query(() => [Event], { name: "events" })
  findAll() {
    return this.eventsService.findAll();
  }

  @Query(() => Event, { name: "event" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateEventDto") updateEventDto: UpdateEventDto
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Mutation(() => Boolean)
  removeEvent(@Args("id", { type: () => Int }) id: number) {
    return this.eventsService.remove(id);
  }

  @Query(() => [Event], { name: "eventsByDate" })
  filterByDate(@Args("filterByDateDto") filterByDateDto: FilterEventDto) {
    return this.eventsService.findByDateRange(filterByDateDto);
  }

  @Query(() => [Event], { name: "eventsByStatus" })
  filterByStatus(@Args("filterByStatusDto") filterByStatusDto: FilterEventDto) {
    return this.eventsService.findByStatus(filterByStatusDto);
  }
}
