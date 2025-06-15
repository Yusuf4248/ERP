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
  ApiBearerAuth,
} from "@nestjs/swagger";
import { SchedulesService } from "./schedules.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Schedules")
@ApiBearerAuth("JWT-auth")
@Controller("schedules")
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi dars jadvalini yaratish" })
  @ApiResponse({ status: 201, description: "Jadval muvaffaqiyatli yaratildi" })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha dars jadvallarini olish" })
  @ApiResponse({ status: 200, description: "Jadvallar ro'yxati" })
  findAll() {
    return this.schedulesService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "Bitta dars jadvalini olish" })
  @ApiResponse({ status: 200, description: "Topilgan jadval" })
  findOne(@Param("id") id: string) {
    return this.schedulesService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Dars jadvalini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateScheduleDto: UpdateScheduleDto
  ) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Dars jadvalini o'chirish" })
  remove(@Param("id") id: string) {
    return this.schedulesService.remove(+id);
  }
}
