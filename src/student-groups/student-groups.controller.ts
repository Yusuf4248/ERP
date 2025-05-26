import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentGroupsService } from './student-groups.service';
import { CreateStudentGroupDto } from './dto/create-student-group.dto';
import { UpdateStudentGroupDto } from './dto/update-student-group.dto';

@Controller('student-groups')
export class StudentGroupsController {
  constructor(private readonly studentGroupsService: StudentGroupsService) {}

  @Post()
  create(@Body() createStudentGroupDto: CreateStudentGroupDto) {
    return this.studentGroupsService.create(createStudentGroupDto);
  }

  @Get()
  findAll() {
    return this.studentGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentGroupDto: UpdateStudentGroupDto) {
    return this.studentGroupsService.update(+id, updateStudentGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentGroupsService.remove(+id);
  }
}
