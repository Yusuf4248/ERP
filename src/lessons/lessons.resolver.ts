import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { LessonsService } from "./lessons.service";
import { Lesson } from "./entities/lesson.entity";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

@Resolver(() => Lesson)
export class LessonsResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Mutation(() => Lesson)
  createLesson(@Args("createLessonInput") createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Query(() => [Lesson], { name: "lessons" })
  findAll(
    @Args("page", { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args("limit", { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number
  ) {
    return this.lessonsService.findAll(page, limit);
  }

  @Query(() => Lesson, { name: "lesson" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Mutation(() => Lesson)
  updateLesson(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateLessonInput") updateLessonDto: UpdateLessonDto
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Mutation(() => Boolean)
  removeLesson(@Args("id", { type: () => Int }) id: number) {
    return this.lessonsService.remove(id);
  }
}
