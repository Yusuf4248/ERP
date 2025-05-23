import { Controller, Get, Post, Patch, Delete } from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Student } from "./entities/student.entities";

@Resolver("student")
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args("createStudent") createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Query(() => [Student])
  findAllStudent() {
    return this.studentService.findAll();
  }

  @Query(() => Student)
  findOneStudent(@Args("id", { type: () => ID }) id: string) {
    return this.studentService.findOne(+id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateStudent") updateStudentDto: UpdateStudentDto
  ) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Mutation(() => Student)
  removeStudent(@Args("id", { type: () => ID }) id: string) {
    return this.studentService.remove(+id);
  }

  @Mutation(() => Student)
  changePasswordStudent(
    @Args("id", { type: () => ID }) id: string,
    @Args("changePasswordStudent") changePasswordDto: ChangePasswordDto
  ) {
    return this.studentService.changePassword(+id, changePasswordDto);
  }
}
