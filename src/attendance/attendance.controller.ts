import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Attendance")
@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: "Yangi davomat yozuvini yaratish" })
  @ApiResponse({ status: 201, description: "Davomat yozuvi yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz ma’lumotlar" })
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha davomat yozuvlarini olish" })
  @ApiResponse({ status: 200, description: "Davomatlar ro'yxati" })
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta davomat yozuvini olish" })
  @ApiResponse({ status: 200, description: "Topilgan davomat yozuvi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.attendanceService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Davomat yozuvini yangilash" })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Yozuv topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto
  ) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Davomat yozuvini o'chirish" })
  @ApiResponse({ status: 200, description: "Yozuv o'chirildi" })
  @ApiResponse({ status: 404, description: "Yozuv topilmadi" })
  remove(@Param("id") id: string) {
    return this.attendanceService.remove(+id);
  }
}
