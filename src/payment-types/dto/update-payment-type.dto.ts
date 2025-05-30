import { InputType, Field, PartialType } from "@nestjs/graphql";
import { CreatePaymentTypeDto } from "./create-payment-type.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

@InputType()
export class UpdatePaymentTypeDto extends PartialType(CreatePaymentTypeDto) {
  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "Payme", description: "To'lov turi nomi" })
  name?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "Payme orqali to'lov", description: "Izoh" })
  description?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: false, description: "Faollik holati" })
  is_active?: boolean;
}
