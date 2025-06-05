import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

@InputType()
export class CreateBranchDto {
  @ApiProperty({ example: "Chilonzor Filiali", description: "Filial nomi" })
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @ApiProperty({ example: "Toshkent sh., Chilonzor 5", description: "Manzil" })
  @IsString()
  @IsNotEmpty()
  @Field()
  address: string;

  @ApiProperty({ example: "+998901234567", description: "Qo'ng'iroq raqami" })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  @Field()
  call_number: string;

  @Field({ nullable: true })
  @IsArray()
  @IsOptional()
  teachersId?: number[];
}
