import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TeacherService } from "./teacher.service";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { Teacher } from "./entities/teacher.entity";

@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: "Create a new teacher" })
  @ApiResponse({ status: 201, type: Teacher })
  @ApiBody({ type: CreateTeacherDto })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all teachers" })
  @ApiResponse({ status: 200, type: [Teacher] })
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get teacher by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, type: Teacher })
  findOne(@Param("id") id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update teacher by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateTeacherDto })
  @ApiResponse({ status: 200, type: Teacher })
  update(@Param("id") id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete teacher by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: string) {
    return this.teacherService.remove(+id);
  }

  @Patch("change_password/:id")
  @ApiOperation({ summary: "Change teacher password" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: "Password updated successfully" })
  changePassword(
    @Param("id") id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.teacherService.changePassword(+id, changePasswordDto);
  }
}
