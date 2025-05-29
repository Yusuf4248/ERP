import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { RoomsService } from "./rooms.service";
import { Room } from "./entities/room.entity";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  createRoom(@Args("createRoomDto") createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Query(() => [Room], { name: "rooms" })
  findAll() {
    return this.roomsService.findAll();
  }

  @Query(() => Room, { name: "room" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateRoomDto") updateRoomDto: UpdateRoomDto
  ) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Mutation(() => Room)
  removeRoom(@Args("id", { type: () => Int }) id: number) {
    return this.roomsService.remove(id);
  }
}
