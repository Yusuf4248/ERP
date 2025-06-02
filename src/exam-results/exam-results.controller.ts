import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExamResultsService } from "./exam-results.service";
import { CreateExamResultDto } from "./dto/create-exam-result.dto";
import { UpdateExamResultDto } from "./dto/update-exam-result.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Exam Results")
@Controller("exam-results")
export class ExamResultsController {
  constructor(private readonly examResultsService: ExamResultsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new exam result" })
  @ApiResponse({
    status: 201,
    description: "The exam result has been successfully created.",
  })
  create(@Body() createExamResultDto: CreateExamResultDto) {
    return this.examResultsService.create(createExamResultDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all exam results" })
  @ApiResponse({ status: 200, description: "List of all exam results" })
  findAll() {
    return this.examResultsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get exam result by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Exam result found" })
  @ApiResponse({ status: 404, description: "Exam result not found" })
  findOne(@Param("id") id: string) {
    return this.examResultsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update exam result by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "The exam result has been successfully updated.",
  })
  update(
    @Param("id") id: string,
    @Body() updateExamResultDto: UpdateExamResultDto
  ) {
    return this.examResultsService.update(+id, updateExamResultDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete exam result by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "The exam result has been successfully deleted.",
  })
  remove(@Param("id") id: string) {
    return this.examResultsService.remove(+id);
  }
}
