import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Grades")
@Controller("grades")
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new grade" })
  @ApiResponse({ status: 201, description: "Grade successfully created" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all grades" })
  @ApiResponse({ status: 200, description: "List of grades returned" })
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a grade by ID" })
  @ApiParam({ name: "id", type: "number", description: "ID of the grade" })
  @ApiResponse({ status: 200, description: "Grade found" })
  @ApiResponse({ status: 404, description: "Grade not found" })
  findOne(@Param("id") id: string) {
    return this.gradesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a grade by ID" })
  @ApiParam({ name: "id", type: "number", description: "ID of the grade" })
  @ApiResponse({ status: 200, description: "Grade successfully updated" })
  @ApiResponse({ status: 404, description: "Grade not found" })
  update(@Param("id") id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a grade by ID" })
  @ApiParam({ name: "id", type: "number", description: "ID of the grade" })
  @ApiResponse({ status: 200, description: "Grade successfully deleted" })
  @ApiResponse({ status: 404, description: "Grade not found" })
  remove(@Param("id") id: string) {
    return this.gradesService.remove(+id);
  }
}
