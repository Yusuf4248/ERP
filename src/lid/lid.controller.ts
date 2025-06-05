import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { LidService } from "./lid.service";
import { CreateLidDto } from "./dto/create-lid.dto";
import { UpdateLidDto } from "./dto/update-lid.dto";
import { GetLidsByStatusDto } from "./dto/get-lid-by-status.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { LidEmailDto } from "./dto/email.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { RolesGuard } from "../common/guards/role.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { Roles } from "../app.constants";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@Controller("lid")
@ApiBearerAuth()
export class LidController {
  constructor(private readonly lidService: LidService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi lid yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi lid muvaffaqiyatli yaratildi",
  })
  create(@Body() createLidDto: CreateLidDto) {
    return this.lidService.create(createLidDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha lidlarni olish" })
  @ApiResponse({ status: 200, description: "Lidlar ro'yxati" })
  findAll() {
    return this.lidService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("superadmin", "admin", "lid")
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha lidni olish" })
  @ApiResponse({ status: 200, description: "Lid topildi" })
  @ApiResponse({ status: 404, description: "Lid topilmadi" })
  findOne(@Param("id") id: string) {
    return this.lidService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("superadmin", "admin", "lid")
  @Patch(":id")
  @ApiOperation({ summary: "Lidni yangilash" })
  @ApiResponse({ status: 200, description: "Lid muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateLidDto: UpdateLidDto) {
    return this.lidService.update(+id, updateLidDto);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("superadmin", "admin", "lid")
  @Delete(":id")
  @ApiOperation({ summary: "Lidni o'chirish" })
  @ApiResponse({ status: 200, description: "Lid muvaffaqiyatli o'chirildi" })
  remove(@Param("id") id: string) {
    return this.lidService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post("by-status")
  @ApiOperation({ summary: "Status bo'yicha lidlarni olish" })
  @ApiBody({ type: GetLidsByStatusDto })
  @ApiOkResponse({
    description: "Berilgan status bo'yicha lidlar va ularning soni",
    schema: {
      example: {
        count: 2,
        data: [
          {
            id: 1,
            first_name: "Ali",
            last_name: "Valiyev",
            lid_status: "yangi",
          },
          {
            id: 2,
            first_name: "Laylo",
            last_name: "Olimova",
            lid_status: "yangi",
          },
        ],
      },
    },
  })
  async getLidsByStatus(@Body() body: GetLidsByStatusDto) {
    return this.lidService.findByStatus(body.status);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "lid")
  @HttpCode(HttpStatus.OK)
  @Post("new_otp")
  async newOtp(@Body() body: LidEmailDto) {
    return this.lidService.generateNewOtp(body.email);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "lid")
  @HttpCode(200)
  @Post("verifyOtp/:id")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Param("id") otp_id: string) {
    return this.lidService.verifyOtp(otp_id, verifyOtpDto);
  }
}
