import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsUrl,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateHomeworkDto {
  @ApiProperty({
    example: 1,
    description: "Guruh IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  @Field()
  groupId: number;

  @ApiProperty({
    example: 12,
    description: "Ustozning IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  @Field()
  teacherId: number;

  @ApiProperty({
    example: 1,
    description: "Dars IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  @Field()
  lessonId: number;

  @ApiProperty({
    example: "3-mavzu bo'yicha mashqlar",
    description: "Topshiriq tavsifi",
  })
  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @ApiProperty({
    example: "2025-06-01T23:59:00.000Z",
    description: "Topshiriq muddati (deadline)",
  })
  @IsDateString()
  @IsNotEmpty()
  @Field()
  deadline: Date;
}
