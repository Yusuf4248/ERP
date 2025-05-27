import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { HomeworksService } from "./homeworks.service";
import { Homework } from "./entities/homework.entity";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";

@Resolver(() => Homework)
export class HomeworksResolver {
  constructor(private readonly homeworksService: HomeworksService) {}

  @Mutation(() => Homework)
  createHomework(
    @Args("createHomeworkInput") createHomeworkDto: CreateHomeworkDto
  ) {
    return this.homeworksService.create(createHomeworkDto);
  }

  @Query(() => [Homework], { name: "homeworks" })
  findAll() {
    return this.homeworksService.findAll();
  }

  @Query(() => Homework, { name: "homework" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.homeworksService.findOne(id);
  }

  @Mutation(() => Homework)
  updateHomework(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateHomeworkInput") updateHomeworkDto: UpdateHomeworkDto
  ) {
    return this.homeworksService.update(id, updateHomeworkDto);
  }

  @Mutation(() => Homework)
  removeHomework(@Args("id", { type: () => Int }) id: number) {
    return this.homeworksService.remove(id);
  }
}
