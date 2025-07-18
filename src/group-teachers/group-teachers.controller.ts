import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { GroupTeachersService } from "./group-teachers.service";
import { CreateGroupTeacherDto } from "./dto/create-group-teacher.dto";
import { UpdateGroupTeacherDto } from "./dto/update-group-teacher.dto";
import { GroupTeacher } from "./entities/group-teacher.entity";

@ApiTags("Group-Teachers")
@Controller("group-teachers")
export class GroupTeachersController {
  constructor(private readonly groupTeachersService: GroupTeachersService) {}

  @Post()
  @ApiOperation({ summary: "Assign teacher to group" })
  @ApiResponse({
    status: 201,
    description: "Teacher successfully assigned to group.",
    type: GroupTeacher,
  })
  create(@Body() createGroupTeacherDto: CreateGroupTeacherDto) {
    return this.groupTeachersService.create(createGroupTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all group-teacher assignments" })
  @ApiResponse({
    status: 200,
    description: "List of group-teacher assignments",
    type: [GroupTeacher],
  })
  findAll() {
    return this.groupTeachersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single group-teacher assignment by ID" })
  @ApiParam({ name: "id", type: Number, description: "GroupTeacher ID" })
  @ApiResponse({
    status: 200,
    description: "Single group-teacher assignment",
    type: GroupTeacher,
  })
  findOne(@Param("id") id: string) {
    return this.groupTeachersService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update group-teacher assignment" })
  @ApiParam({ name: "id", type: Number, description: "GroupTeacher ID" })
  @ApiResponse({
    status: 200,
    description: "Group-teacher assignment updated",
    type: GroupTeacher,
  })
  update(
    @Param("id") id: string,
    @Body() updateGroupTeacherDto: UpdateGroupTeacherDto
  ) {
    return this.groupTeachersService.update(+id, updateGroupTeacherDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remove group-teacher assignment" })
  @ApiParam({ name: "id", type: Number, description: "GroupTeacher ID" })
  @ApiResponse({ status: 200, description: "Group-teacher assignment removed" })
  remove(@Param("id") id: string) {
    return this.groupTeachersService.remove(+id);
  }
}
