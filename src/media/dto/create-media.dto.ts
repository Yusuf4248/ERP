import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

@InputType()
export class CreateMediaDto {
  @ApiProperty({ example: 5, description: "Bog'liq jadvalning ID si" })
  @IsNumber()
  @Field()
  table_id: number;

  @ApiProperty({
    example: "homework",
    description: "Bog'liq jadval nomi",
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  table_name: string;

  @ApiProperty({
    example: "https://domain.com/uploads/file.pdf",
    description: "Fayl URL manzili",
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  files: string;

  @ApiProperty({ example: "application/pdf", description: "Fayl MIME turi" })
  @IsString()
  @IsNotEmpty()
  @Field()
  type: string;

  @ApiProperty({ example: "file.pdf", description: "Yuklangan fayl nomi" })
  @IsString()
  @IsNotEmpty()
  @Field()
  file_name: string;

  @ApiProperty({ example: 2.5, description: "Fayl hajmi (MB yoki KB)" })
  @IsNumber()
  @Field(() => Float)
  size: number;
}
