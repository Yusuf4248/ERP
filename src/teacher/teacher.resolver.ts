import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TeacherService } from "./teacher.service";
import { Teacher } from "./entities/teacher.entity";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ChangePasswordDto } from "../student/dto/change-password.dto";

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => Teacher)
  createTeacher(@Args("createTeacherDto") createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Query(() => [Teacher], { name: "getAllTeachers" })
  findAll() {
    return this.teacherService.findAll();
  }

  @Query(() => Teacher, { name: "getTeacher" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.teacherService.findOne(id);
  }

  @Mutation(() => Teacher)
  updateTeacher(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateTeacherDto") updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Mutation(() => Boolean)
  removeTeacher(@Args("id", { type: () => Int }) id: number) {
    return this.teacherService.remove(id);
  }

  @Mutation(() => Boolean)
  changeTeacherPassword(
    @Args("id", { type: () => Int }) id: number,
    @Args("changePasswordDto") changePasswordDto: ChangePasswordDto
  ) {
    return this.teacherService.changePassword(id, changePasswordDto);
  }
}
