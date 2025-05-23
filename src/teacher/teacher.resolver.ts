import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  TeacherResponse,
  FindAllTeachersResponse,
  RemoveResponse,
} from "./dto/responses";
import { Teacher } from "./entities/teacher.entity";

@Resolver("teacher")
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Mutation(() => TeacherResponse)
  createTeacher(@Args("createTeacher") createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Query(() => FindAllTeachersResponse)
  findAllTeacher() {
    return this.teacherService.findAll();
  }

  @Query(() => TeacherResponse)
  findOneTeacher(@Args("id", { type: () => ID }) id: string) {
    return this.teacherService.findOne(+id);
  }

  @Mutation(() => TeacherResponse)
  updateTeacher(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateTeacher") updateTeacherDto: UpdateTeacherDto
  ) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Mutation(() => RemoveResponse)
  removeTeacher(@Args("id", { type: () => ID }) id: string) {
    return this.teacherService.remove(+id);
  }

  @Mutation(() => Teacher)
  changePasswordTeacher(
    @Args("id", { type: () => ID }) id: string,
    @Args("changePasswordTeacher") changePasswordDto: ChangePasswordDto
  ) {
    return this.teacherService.changePassword(+id, changePasswordDto);
  }
}
