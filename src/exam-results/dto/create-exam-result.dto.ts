import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsPositive } from "class-validator";
import { InputType, Field, Int, ID } from "@nestjs/graphql";

@InputType()
export class CreateExamResultDto {
  @ApiProperty({ example: 87 })
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  score: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  max_score: number;

  @ApiProperty({ example: "2025-05-31" })
  @IsDateString()
  @Field()
  date: string;

  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsInt()
  @Field(() => ID)
  examId: number;

  @ApiProperty({ example: 2, description: "Student ID" })
  @IsInt()
  @Field(() => ID)
  studentId: number;
}
