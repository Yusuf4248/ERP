import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentTypesService } from "./payment-types.service";
import { CreatePaymentTypeDto } from "./dto/create-payment-type.dto";
import { UpdatePaymentTypeDto } from "./dto/update-payment-type.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Payment Types")
@Controller("payment-types")
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi to'lov turini yaratish" })
  @ApiResponse({ status: 201, description: "To'lov turi yaratildi" })
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypesService.create(createPaymentTypeDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha to'lov turlarini olish" })
  @ApiResponse({ status: 200, description: "To'lov turlar ro'yxati" })
  findAll() {
    return this.paymentTypesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta to'lov turini olish" })
  @ApiParam({ name: "id", description: "To'lov turi ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan to'lov turi" })
  findOne(@Param("id") id: string) {
    return this.paymentTypesService.findOne(+id);
  }

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

  @Delete(":id")
  @ApiOperation({ summary: "To'lov turini o'chirish" })
  @ApiParam({ name: "id", description: "To'lov turi ID raqami" })
  @ApiResponse({ status: 200, description: "To'lov turi o'chirildi" })
  remove(@Param("id") id: string) {
    return this.paymentTypesService.remove(+id);
  }
}
