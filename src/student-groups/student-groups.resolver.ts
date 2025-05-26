import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentGroupsService } from './student-groups.service';
import { CreateStudentGroupDto } from './dto/create-student-group.dto';
import { UpdateStudentGroupDto } from './dto/update-student-group.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentGroup } from './entities/student-group.entity';

@Resolver(() => StudentGroup)
export class StudentGroupsResolver {
  constructor(private readonly studentGroupsService: StudentGroupsService) {}

  @Mutation(() => StudentGroup)
  createStudentGroup(
    @Args("createStudentGroup") createStudentGroupDto: CreateStudentGroupDto
  ) {
    return this.studentGroupsService.create(createStudentGroupDto);
  }

  @Query(() => [StudentGroup])
  findAllStudentGroup() {
    return this.studentGroupsService.findAll();
  }

  @Query(() => StudentGroup)
  findOneStudentGroup(@Args("id") id: number) {
    return this.studentGroupsService.findOne(+id);
  }

  @Mutation(()=>StudentGroup)
  updateStudentGroup(
    @Args("id") id: number,
    @Args("updateStudentGroup") updateStudentGroupDto: UpdateStudentGroupDto
  ) {
    return this.studentGroupsService.update(+id, updateStudentGroupDto);
  }

  @Mutation(()=>StudentGroup)
  removeStudentGroup(@Args("id") id:number) {
    return this.studentGroupsService.remove(+id);
  }
}
