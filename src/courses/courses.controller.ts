import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
} from "@nestjs/swagger";

@ApiTags("Courses")
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

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

  @Patch(":id")
  @ApiOperation({ summary: "Update a course by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: "Course updated successfully." })
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a course by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Course deleted successfully." })
  remove(@Param("id") id: string) {
    return this.coursesService.remove(+id);
  }
}
