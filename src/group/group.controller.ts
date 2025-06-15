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
} from "@nestjs/swagger";
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
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha grouplarni olish" })
  @ApiResponse({ status: 200, description: "Grouplar ro'yxati", type: [Group] })
  findAll() {
    return this.groupService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha group olish" })
  @ApiResponse({ status: 200, description: "Group topildi", type: Group })
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Groupni tahrirlash" })
  @ApiResponse({ status: 200, description: "Group yangilandi", type: Group })
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Groupni o'chirish" })
  @ApiResponse({ status: 200, description: "Group o'chirildi" })
  remove(@Param("id") id: string) {
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
}
