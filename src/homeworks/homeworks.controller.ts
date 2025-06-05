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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { HomeworksService } from "./homeworks.service";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { Homework } from "./entities/homework.entity";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Homeworks")
@ApiBearerAuth()
@Controller("homeworks")
export class HomeworksController {
  constructor(private readonly homeworksService: HomeworksService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "Get homework by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Homework found", type: Homework })
  findOne(@Param("id") id: string) {
    return this.homeworksService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete homework by ID" })
  @ApiParam({ name: "id", type: String })
  @ApiResponse({ status: 200, description: "Homework deleted" })
  remove(@Param("id") id: string) {
    return this.homeworksService.remove(+id);
  }
}
