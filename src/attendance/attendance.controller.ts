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
import { AttendanceService } from "./attendance.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Attendance")
@ApiBearerAuth()
@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi davomat yozuvini yaratish" })
  @ApiResponse({ status: 201, description: "Davomat yozuvi yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz ma’lumotlar" })
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha davomat yozuvlarini olish" })
  @ApiResponse({ status: 200, description: "Davomatlar ro'yxati" })
  findAll() {
    return this.attendanceService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "Bitta davomat yozuvini olish" })
  @ApiResponse({ status: 200, description: "Topilgan davomat yozuvi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.attendanceService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Davomat yozuvini o'chirish" })
  @ApiResponse({ status: 200, description: "Yozuv o'chirildi" })
  @ApiResponse({ status: 404, description: "Yozuv topilmadi" })
  remove(@Param("id") id: string) {
    return this.attendanceService.remove(+id);
  }
}
