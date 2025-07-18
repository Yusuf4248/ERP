import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateGroupStudentDto {
  @ApiProperty({
    example: 2,
    description: "Group ID",
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  groupId: number;

  @ApiProperty({
    example: 5,
    description: "Student ID",
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  studentId: number;

  @ApiProperty({
    example: true,
    description: "Status of the student in the group (active/inactive)",
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  status?: boolean = true;

  @ApiProperty({
    example: "2025-01-01",
    description: "Period start date of the group",
    type: String,
    format: "date",
  })
  @IsDateString()
  @IsNotEmpty()
  period: string;
}
