import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeacherGroupsService } from "./teacher-groups.service";
import { CreateTeacherGroupDto } from "./dto/create-teacher-group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher-group.dto";

@Controller("teacher-groups")
export class TeacherGroupsController {
  constructor(private readonly teacherGroupsService: TeacherGroupsService) {}

  @Post()
  create(@Body() createTeacherGroupDto: CreateTeacherGroupDto) {
    return this.teacherGroupsService.create(createTeacherGroupDto);
  }

  @Get()
  findAll() {
    return this.teacherGroupsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teacherGroupsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeacherGroupDto: UpdateTeacherGroupDto
  ) {
    return this.teacherGroupsService.update(+id, updateTeacherGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teacherGroupsService.remove(+id);
  }
}
