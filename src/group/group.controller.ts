import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";

@ApiTags("Groups")
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: "Yangi group yaratish" })
  @ApiResponse({ status: 201, description: "Group yaratildi", type: Group })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha grouplarni olish" })
  @ApiResponse({ status: 200, description: "Grouplar ro'yxati", type: [Group] })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha group olish" })
  @ApiResponse({ status: 200, description: "Group topildi", type: Group })
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Groupni tahrirlash" })
  @ApiResponse({ status: 200, description: "Group yangilandi", type: Group })
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Groupni o'chirish" })
  @ApiResponse({ status: 200, description: "Group o'chirildi" })
  remove(@Param("id") id: string) {
    return this.groupService.remove(+id);
  }
}
