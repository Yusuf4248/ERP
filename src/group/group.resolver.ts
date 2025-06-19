import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GroupService } from "./group.service";
import { Group } from "./entities/group.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group)
  createGroup(@Args("createGroupDto") createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Query(() => [Group], { name: "getAllGroups" })
  findAll(
    @Args("page", { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number
  ) {
    return this.groupService.findAll(page, limit);
  }

  @Query(() => Group, { name: "getGroupById" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.groupService.findOne(id);
  }

  @Mutation(() => Group)
  updateGroup(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateGroupDto") updateGroupDto: UpdateGroupDto
  ) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Mutation(() => Boolean)
  removeGroup(@Args("id", { type: () => Int }) id: number) {
    return this.groupService.remove(id).then(() => true);
  }
}
