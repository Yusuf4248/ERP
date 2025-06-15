import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { CreateCourseDto } from "./dto/create-course.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Courses")
@ApiBearerAuth("JWT-auth")
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Create a new course" })
  @ApiResponse({ status: 201, description: "Course successfully created." })
  @ApiBody({ type: CreateCourseDto })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all courses" })
  @ApiResponse({ status: 200, description: "List of all courses." })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a course by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Course found." })
  @ApiResponse({ status: 404, description: "Course not found." })
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a course by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: "Course updated successfully." })
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a course by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Course deleted successfully." })
  remove(@Param("id") id: string) {
    return this.coursesService.remove(+id);
  }
}
