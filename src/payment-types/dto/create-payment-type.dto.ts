import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreatePaymentTypeDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Click", description: "To'lov turi nomi" })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ example: "Click orqali to'lov", required: false })
  description?: string;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: "Faollik holati",
    required: false,
  })
  is_active?: boolean;
}
