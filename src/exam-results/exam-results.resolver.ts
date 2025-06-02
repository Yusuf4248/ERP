import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ExamResultsService } from "./exam-results.service";
import { ExamResult } from "./entities/exam-result.entity";
import { CreateExamResultDto } from "./dto/create-exam-result.dto";
import { UpdateExamResultDto } from "./dto/update-exam-result.dto";

@Resolver(() => ExamResult)
export class ExamResultsResolver {
  constructor(private readonly examResultsService: ExamResultsService) {}

  @Mutation(() => ExamResult)
  createExamResult(
    @Args("createExamResultDto") createExamResultDto: CreateExamResultDto
  ) {
    return this.examResultsService.create(createExamResultDto);
  }

  @Query(() => [ExamResult], { name: "examResults" })
  findAll() {
    return this.examResultsService.findAll();
  }

  @Query(() => ExamResult, { name: "examResult" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.examResultsService.findOne(id);
  }

  @Mutation(() => ExamResult)
  updateExamResult(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateExamResultDto") updateExamResultDto: UpdateExamResultDto
  ) {
    return this.examResultsService.update(id, updateExamResultDto);
  }

  @Mutation(() => ExamResult)
  removeExamResult(@Args("id", { type: () => Int }) id: number) {
    return this.examResultsService.remove(id);
  }
}
