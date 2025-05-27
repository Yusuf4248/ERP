import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GradesService } from "./grades.service";
import { Grade } from "./entities/grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";

@Resolver(() => Grade)
export class GradesResolver {
  constructor(private readonly gradesService: GradesService) {}

  @Mutation(() => Grade)
  createGrade(@Args("createGradeDto") createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Query(() => [Grade], { name: "grades" })
  findAll() {
    return this.gradesService.findAll();
  }

  @Query(() => Grade, { name: "grade" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.gradesService.findOne(id);
  }

  @Mutation(() => Grade)
  updateGrade(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateGradeDto") updateGradeDto: UpdateGradeDto
  ) {
    return this.gradesService.update(id, updateGradeDto);
  }

  @Mutation(() => Grade)
  removeGrade(@Args("id", { type: () => Int }) id: number) {
    return this.gradesService.remove(id);
  }
}
