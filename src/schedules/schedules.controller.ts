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
import { SchedulesService } from "./schedules.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@ApiTags("Schedules")
@Controller("schedules")
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi dars jadvalini yaratish" })
  @ApiResponse({ status: 201, description: "Jadval muvaffaqiyatli yaratildi" })
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha dars jadvallarini olish" })
  @ApiResponse({ status: 200, description: "Jadvallar ro'yxati" })
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta dars jadvalini olish" })
  @ApiResponse({ status: 200, description: "Topilgan jadval" })
  findOne(@Param("id") id: string) {
    return this.schedulesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Dars jadvalini yangilash" })
  update(
    @Param("id") id: string,
    @Body() updateScheduleDto: UpdateScheduleDto
  ) {
    return this.schedulesService.update(+id, updateScheduleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Dars jadvalini o'chirish" })
  remove(@Param("id") id: string) {
    return this.schedulesService.remove(+id);
  }
}
