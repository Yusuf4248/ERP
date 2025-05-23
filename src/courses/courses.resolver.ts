import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Course } from "./entities/course.entity";

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => Course)
  createCourse(@Args("createCourse") createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Query(() => [Course])
  findAllCourses() {
    return this.coursesService.findAll();
  }

  @Query(() => Course)
  findOneCourse(@Args("id", { type: () => ID }) id: string) {
    return this.coursesService.findOne(+id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateCourse") updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Mutation(() => Course)
  removeCourse(@Args("id", { type: () => ID }) id: string) {
    return this.coursesService.remove(+id);
  }
}
