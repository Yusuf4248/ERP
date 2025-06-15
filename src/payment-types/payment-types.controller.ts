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
import { PaymentTypesService } from "./payment-types.service";
import { CreatePaymentTypeDto } from "./dto/create-payment-type.dto";
import { UpdatePaymentTypeDto } from "./dto/update-payment-type.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("Payment Types")
@ApiBearerAuth("JWT-auth")
@Controller("payment-types")
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi to'lov turini yaratish" })
  @ApiResponse({ status: 201, description: "To'lov turi yaratildi" })
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypesService.create(createPaymentTypeDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "student")
  @Get()
  @ApiOperation({ summary: "Barcha to'lov turlarini olish" })
  @ApiResponse({ status: 200, description: "To'lov turlar ro'yxati" })
  findAll() {
    return this.paymentTypesService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta to'lov turini olish" })
  @ApiParam({ name: "id", description: "To'lov turi ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan to'lov turi" })
  findOne(@Param("id") id: string) {
    return this.paymentTypesService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "To'lov turini tahrirlash" })
  @ApiParam({ name: "id", description: "To'lov turi ID raqami" })
  @ApiResponse({ status: 200, description: "To'lov turi yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updatePaymentTypeDto: UpdatePaymentTypeDto
  ) {
    return this.paymentTypesService.update(+id, updatePaymentTypeDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "To'lov turini o'chirish" })
  @ApiParam({ name: "id", description: "To'lov turi ID raqami" })
  @ApiResponse({ status: 200, description: "To'lov turi o'chirildi" })
  remove(@Param("id") id: string) {
    return this.paymentTypesService.remove(+id);
  }
}
