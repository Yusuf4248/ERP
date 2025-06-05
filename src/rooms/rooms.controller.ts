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
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Rooms")
@ApiBearerAuth()
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi xona yaratish" })
  @ApiResponse({ status: 201, description: "Xona yaratildi" })
  @ApiBody({ type: CreateRoomDto })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha xonalarni olish" })
  @ApiResponse({ status: 200, description: "Xonalar ro'yxati" })
  findAll() {
    return this.roomsService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha xonani olish" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Topilgan xona" })
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Xonani yangilash" })
  @ApiParam({ name: "id", type: "number" })
  @ApiBody({ type: UpdateRoomDto })
  @ApiResponse({ status: 200, description: "Xona yangilandi" })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Xonani o'chirish" })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "Xona o'chirildi" })
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
