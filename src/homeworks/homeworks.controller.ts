import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { HomeworksService } from "./homeworks.service";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { Homework } from "./entities/homework.entity";

@ApiTags("Homeworks")
@Controller("homeworks")
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  @Post()
  @ApiOperation({ summary: "Create new homework" })
  @ApiResponse({
    status: 201,
    description: "Homework created successfully",
    type: Homework,
  })
  @ApiBody({ type: CreateHomeworkDto })
  create(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworksService.create(createHomeworkDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all homeworks" })
  @ApiResponse({
    status: 200,
    description: "List of all homeworks",
    type: [Homework],
  })
  findAll() {
    return this.homeworksService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get homework by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Homework found", type: Homework })
  findOne(@Param("id") id: string) {
    return this.homeworksService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update homework by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiBody({ type: UpdateHomeworkDto })
  @ApiResponse({ status: 200, description: "Homework updated", type: Homework })
  update(
    @Param("id") id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto
  ) {
    return this.homeworksService.update(+id, updateHomeworkDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete homework by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Homework deleted" })
  remove(@Param("id") id: string) {
    return this.homeworksService.remove(+id);
  }
}
