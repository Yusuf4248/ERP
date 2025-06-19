import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

@InputType()
export class CreateMediaDto {
  @ApiProperty({
    example: "https://domain.com/uploads/file.pdf",
    description: "Fayl URL manzili",
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  files: string;

  @ApiProperty({ example: "file.pdf", description: "Yuklangan fayl nomi" })
  @IsString()
  @IsNotEmpty()
  @Field()
  file_name: string;
}
