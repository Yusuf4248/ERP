import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExamsService } from "./exams.service";
import { CreateExamDto } from "./dto/create-exam.dto";
import { UpdateExamDto } from "./dto/update-exam.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Exams")
@Controller("exams")
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new exam" })
  @ApiResponse({ status: 201, description: "Exam successfully created." })
  @ApiResponse({ status: 400, description: "Validation failed." })
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all exams" })
  @ApiResponse({ status: 200, description: "List of all exams" })
  findAll() {
    return this.examsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get exam by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Exam found" })
  @ApiResponse({ status: 404, description: "Exam not found" })
  findOne(@Param("id") id: string) {
    return this.examsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update exam by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Exam updated successfully" })
  @ApiResponse({ status: 404, description: "Exam not found" })
  update(@Param("id") id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(+id, updateExamDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete exam by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Exam deleted successfully" })
  @ApiResponse({ status: 404, description: "Exam not found" })
  remove(@Param("id") id: string) {
    return this.examsService.remove(+id);
  }
}
