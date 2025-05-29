import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { BranchesService } from "./branches.service";
import { Branch } from "./entities/branch.entity";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";

@Resolver(() => Branch)
export class BranchResolver {
  constructor(private readonly branchesService: BranchesService) {}

  @Mutation(() => Branch)
  createBranch(@Args("createBranchDto") createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Query(() => [Branch], { name: "branches" })
  findAll() {
    return this.branchesService.findAll();
  }

  @Query(() => Branch, { name: "branch" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.branchesService.findOne(id);
  }

  @Mutation(() => Branch)
  updateBranch(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateBranchDto") updateBranchDto: UpdateBranchDto
  ) {
    return this.branchesService.update(id, updateBranchDto);
  }

  @Mutation(() => Branch)
  removeBranch(@Args("id", { type: () => Int }) id: number) {
    return this.branchesService.remove(id);
  }
}
