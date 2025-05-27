import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsPositive,
  IsString,
  IsOptional,
  Min,
  Max,
} from "class-validator";

@InputType()
export class CreateGradeDto {
  @ApiProperty({ example: 1, description: "Student ID" })
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  studentId: number;

  @ApiProperty({ example: 10, description: "Homework submission ID" })
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  homeworkSubmissionId: number;

  @ApiProperty({ example: 5, description: "Teacher ID" })
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  teacherId: number;

  @ApiProperty({ example: 85, description: "Grade (0 to 100)" })
  @IsInt()
  @Min(0)
  @Field(() => Int)
  grade: number;

  @ApiProperty({
    example: "Good work!",
    description: "Optional comment from teacher",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  comment: string;
}
