import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { LidService } from "./lid.service";
import { Lid } from "./entities/lid.entity";
import { LidStatus } from "./entities/lid.entity";
import { CreateLidDto } from "./dto/create-lid.dto";
import { UpdateLidDto } from "./dto/update-lid.dto";

@Resolver(() => Lid)
export class LidResolver {
  constructor(private readonly lidService: LidService) {}

  @Mutation(() => Lid)
  createLid(@Args("createLidInput") createLidDto: CreateLidDto) {
    return this.lidService.create(createLidDto);
  }

  @Query(() => [Lid], { name: "lids" })
  findAll() {
    return this.lidService.findAll();
  }

  @Query(() => Lid, { name: "lid" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.lidService.findOne(id);
  }

  @Mutation(() => Lid)
  updateLid(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateLidInput") updateLidDto: UpdateLidDto
  ) {
    return this.lidService.update(id, updateLidDto);
  }

  @Mutation(() => Boolean)
  removeLid(@Args("id", { type: () => Int }) id: number) {
    return this.lidService.remove(id);
  }

  @Query(() => [Lid], { name: "lidsByStatus" })
  getLidsByStatus(
    @Args("status", { type: () => LidStatus }) status: LidStatus
  ) {
    return this.lidService.findByStatus(status);
  }
}
