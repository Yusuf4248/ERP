import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Attendance } from './entities/attendance.entity';


@Resolver(()=>Attendance)
export class AttendanceResolver{
  constructor(private readonly attendanceService: AttendanceService) {}

  @Mutation(()=>Attendance)
  createAttendance(@Args("createAttendance") createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Query(()=>[Attendance])
  findAllAttendance() {
    return this.attendanceService.findAll();
  }

  @Query(()=>Attendance)
  findOneAttendance(@Args('id') id: number) {
    return this.attendanceService.findOne(+id);
  }

  @Mutation(()=>Attendance)
  updateAttendance(@Args('id') id: number, @Args("updateAttendance") updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Mutation(()=>Attendance)
  removeAttendance(@Args('id') id: number) {
    return this.attendanceService.remove(+id);
  }
}
