import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { Query } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Groups")
@ApiBearerAuth("JWT-auth")
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi group yaratish" })
  @ApiResponse({ status: 201, description: "Group yaratildi", type: Group })
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha grouplarni olish (pagination bilan)" })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: "Grouplar ro'yxati", type: [Group] })
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.groupService.findAll(Number(page), Number(limit));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha group olish" })
  @ApiResponse({ status: 200, description: "Group topildi", type: Group })
  async findOne(@Param("id") id: string) {
    return this.groupService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Groupni tahrirlash" })
  @ApiResponse({ status: 200, description: "Group yangilandi", type: Group })
  async update(
    @Param("id") id: string,
    @Body() updateGroupDto: UpdateGroupDto
  ) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Groupni o'chirish" })
  @ApiResponse({ status: 200, description: "Group o'chirildi" })
  async remove(@Param("id") id: string) {
    return this.groupService.remove(+id);
  }

  @Patch(":groupId/add-student/:studentId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  async addStudentToGroup(
    @Param("groupId", ParseIntPipe) groupId: number,
    @Param("studentId", ParseIntPipe) studentId: number
  ) {
    return this.groupService.addStudentToGroup(groupId, studentId);
  }

  @Patch(":groupId/remove-student/:studentId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  async removeStudentFromGroup(
    @Param("groupId", ParseIntPipe) groupId: number,
    @Param("studentId", ParseIntPipe) studentId: number
  ) {
    return this.groupService.removeStudentFromGroup(groupId, studentId);
  }

  @Patch(":groupId/add-teacher/:teacherId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  async addTeacherToGroup(
    @Param("groupId", ParseIntPipe) groupId: number,
    @Param("teacherId", ParseIntPipe) teacherId: number
  ) {
    return this.groupService.addTeacherToGroup(groupId, teacherId);
  }

  @Patch(":groupId/remove-teacher/:teacherId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  async removeTeacherFromGroup(
    @Param("groupId", ParseIntPipe) groupId: number,
    @Param("teacherId", ParseIntPipe) teacherId: number
  ) {
    return this.groupService.removeTeacherFromGroup(groupId, teacherId);
  }

  @Get("/search/:groupName")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @ApiOperation({ summary: "Guruhni nomi orqali olish" })
  @ApiParam({ name: "groupName", type: String, description: "Guruh nomi" })
  @ApiResponse({ status: 200, description: "Topilgan guruh" })
  @ApiResponse({ status: 404, description: "Guruh topilmadi" })
  async getGroupByName(@Param("groupName") groupName: string) {
    return this.groupService.getGroupByName(groupName);
  }
}
