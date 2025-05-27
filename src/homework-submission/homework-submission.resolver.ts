import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { HomeworkSubmissionService } from "./homework-submission.service";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { UpdateHomeworkSubmissionDto } from "./dto/update-homework-submission.dto";

@Resolver(() => HomeworkSubmission)
export class HomeworkSubmissionResolver {
  constructor(
    private readonly homeworkSubmissionService: HomeworkSubmissionService
  ) {}

  @Mutation(() => HomeworkSubmission)
  createHomeworkSubmission(
    @Args("createHomeworkSubmissionDto")
    createHomeworkSubmissionDto: CreateHomeworkSubmissionDto
  ) {
    return this.homeworkSubmissionService.create(createHomeworkSubmissionDto);
  }

  @Query(() => [HomeworkSubmission], { name: "homeworkSubmissions" })
  findAll() {
    return this.homeworkSubmissionService.findAll();
  }

  @Query(() => HomeworkSubmission, { name: "homeworkSubmission" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.homeworkSubmissionService.findOne(id);
  }

  @Mutation(() => HomeworkSubmission)
  updateHomeworkSubmission(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateHomeworkSubmissionDto")
    updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto
  ) {
    return this.homeworkSubmissionService.update(
      id,
      updateHomeworkSubmissionDto
    );
  }

  @Mutation(() => HomeworkSubmission)
  removeHomeworkSubmission(@Args("id", { type: () => Int }) id: number) {
    return this.homeworkSubmissionService.remove(id);
  }
}
