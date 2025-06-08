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
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Payment } from "./entities/payment.entity";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Payments")
@ApiBearerAuth()
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi tolov yaratish" })
  @ApiResponse({ status: 201, description: "Tolov yaratildi", type: Payment })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get()
  @ApiOperation({ summary: "Barcha tolovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Tolovlar royxati",
    type: [Payment],
  })
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta tolovni olish" })
  @ApiParam({ name: "id", description: "Tolov ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan tolov", type: Payment })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Tolov ma'lumotlarini yangilash" })
  @ApiParam({ name: "id", description: "Tolov ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan tolov",
    type: Payment,
  })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Tolovni ochirish" })
  @ApiParam({ name: "id", description: "Tolov ID raqami" })
  @ApiResponse({ status: 200, description: "Tolov ochirildi" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
