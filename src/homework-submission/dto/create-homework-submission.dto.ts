import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from "class-validator";

@InputType()
export class CreateHomeworkSubmissionDto {
  @ApiProperty({ example: 1, description: "Talabaning ID raqami" })
  @IsInt()
  @IsNotEmpty()
  @Field()
  studentId: number;

  @ApiProperty({ example: 4, description: "Uy vazifasining ID raqami" })
  @IsInt()
  @IsNotEmpty()
  @Field()
  homeworkId: number;

  @ApiProperty({
    example: "https://example.com/file.pdf",
    description: "Tugatib topshirilgan fayl URL manzili",
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @Field()
  file_url: string;

  @ApiProperty({
    example: "Vazifa murakkab edi, lekin bajardim.",
    description: "Izoh (ixtiyoriy)",
  })
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  comment?: string;
}
