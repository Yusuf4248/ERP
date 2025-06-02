import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ExamsService } from "./exams.service";
import { Exam } from "./entities/exam.entity";
import { CreateExamDto } from "./dto/create-exam.dto";
import { UpdateExamDto } from "./dto/update-exam.dto";

@Resolver(() => Exam)
export class ExamsResolver {
  constructor(private readonly examsService: ExamsService) {}

  @Mutation(() => Exam)
  createExam(@Args("createExamInput") createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Query(() => [Exam], { name: "exams" })
  findAll() {
    return this.examsService.findAll();
  }

  @Query(() => Exam, { name: "exam" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.examsService.findOne(id);
  }

  @Mutation(() => Exam)
  updateExam(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateExamInput") updateExamDto: UpdateExamDto
  ) {
    return this.examsService.update(id, updateExamDto);
  }

  @Mutation(() => Exam)
  removeExam(@Args("id", { type: () => Int }) id: number) {
    return this.examsService.remove(id);
  }
}
