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
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { GroupStudentsService } from "./group-students.service";
import { CreateGroupStudentDto } from "./dto/create-group-student.dto";
import { UpdateGroupStudentDto } from "./dto/update-group-student.dto";
import { GroupStudent } from "./entities/group-student.entity";

@ApiTags("Group Students")
@Controller("group-students")
export class GroupStudentsController {
  constructor(private readonly groupStudentsService: GroupStudentsService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new group-student relationship",
    description: "Add a student to a group with specified status and period",
  })
  @ApiBody({
    type: CreateGroupStudentDto,
    description: "Group student data to create",
  })
  @ApiCreatedResponse({
    description: "Group student relationship created successfully",
    type: GroupStudent,
  })
  @ApiBadRequestResponse({
    description: "Invalid input data or validation error",
  })
  create(@Body() createGroupStudentDto: CreateGroupStudentDto) {
    return this.groupStudentsService.create(createGroupStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all group-student relationships",
    description: "Retrieve a list of all group-student relationships",
  })
  @ApiOkResponse({
    description: "List of group-student relationships retrieved successfully",
    type: [GroupStudent],
  })
  findAll() {
    return this.groupStudentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a specific group-student relationship",
    description: "Retrieve a group-student relationship by its ID",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "The ID of the group-student relationship",
    example: 1,
  })
  @ApiOkResponse({
    description: "Group-student relationship found successfully",
    type: GroupStudent,
  })
  @ApiNotFoundResponse({
    description: "Group-student relationship not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid ID format",
  })
  findOne(@Param("id") id: string) {
    return this.groupStudentsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a group-student relationship",
    description: "Update an existing group-student relationship by ID",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "The ID of the group-student relationship to update",
    example: 1,
  })
  @ApiBody({
    type: UpdateGroupStudentDto,
    description: "Group student data to update",
  })
  @ApiOkResponse({
    description: "Group-student relationship updated successfully",
    type: GroupStudent,
  })
  @ApiNotFoundResponse({
    description: "Group-student relationship not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid input data or validation error",
  })
  update(
    @Param("id") id: string,
    @Body() updateGroupStudentDto: UpdateGroupStudentDto
  ) {
    return this.groupStudentsService.update(+id, updateGroupStudentDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a group-student relationship",
    description: "Remove a student from a group by deleting the relationship",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "The ID of the group-student relationship to delete",
    example: 1,
  })
  @ApiOkResponse({
    description: "Group-student relationship deleted successfully",
  })
  @ApiNotFoundResponse({
    description: "Group-student relationship not found",
  })
  @ApiBadRequestResponse({
    description: "Invalid ID format",
  })
  remove(@Param("id") id: string) {
    return this.groupStudentsService.remove(+id);
  }
}
