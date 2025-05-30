import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HomeworkSubmissionService } from "./homework-submission.service";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { UpdateHomeworkSubmissionDto } from "./dto/update-homework-submission.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Homework Submission")
@Controller("homework-submission")
export class HomeworkSubmissionController {
  constructor(
    private readonly homeworkSubmissionService: HomeworkSubmissionService
  ) {}

  @Post()
  @ApiOperation({ summary: "Submit homework" })
  @ApiResponse({ status: 201, description: "Homework submitted successfully" })
  @ApiResponse({ status: 400, description: "Invalid input" })
  create(@Body() createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
    return this.homeworkSubmissionService.create(createHomeworkSubmissionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all submitted homework" })
  @ApiResponse({ status: 200, description: "List of homework submissions" })
  findAll() {
    return this.homeworkSubmissionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific homework submission by ID" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Homework submission ID",
  })
  @ApiResponse({ status: 200, description: "Homework submission found" })
  @ApiResponse({ status: 404, description: "Homework submission not found" })
  findOne(@Param("id") id: string) {
    return this.homeworkSubmissionService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a submitted homework" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Homework submission ID",
  })
  @ApiResponse({ status: 200, description: "Homework updated successfully" })
  @ApiResponse({ status: 404, description: "Homework not found" })
  update(
    @Param("id") id: string,
    @Body() updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto
  ) {
    return this.homeworkSubmissionService.update(
      +id,
      updateHomeworkSubmissionDto
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a submitted homework" })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Homework submission ID",
  })
  @ApiResponse({ status: 200, description: "Homework deleted successfully" })
  @ApiResponse({ status: 404, description: "Homework not found" })
  remove(@Param("id") id: string) {
    return this.homeworkSubmissionService.remove(+id);
  }
}
