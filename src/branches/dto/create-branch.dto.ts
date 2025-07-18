import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateBranchDto {
  @ApiProperty({ example: "Chilonzor Filiali", description: "Filial nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Toshkent sh., Chilonzor 5", description: "Manzil" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "+998901234567", description: "Qo'ng'iroq raqami" })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  call_number: string;
}
