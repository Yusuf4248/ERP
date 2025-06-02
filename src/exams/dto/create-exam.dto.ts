import { InputType, Field } from "@nestjs/graphql";
import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ExamStatus } from "../entities/exam.entity";

@InputType()
export class CreateExamDto {
  @ApiProperty({ example: "Final Exam" })
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "Final test for the React course" })
  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: "2025-06-01" })
  @Field()
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: ExamStatus, example: ExamStatus.PENDING })
  @Field(() => ExamStatus)
  @IsEnum(ExamStatus)
  status: ExamStatus;

  @ApiProperty({ example: "14:00", description: "Start time (HH:mm)" })
  @Field()
  @IsMilitaryTime()
  start_time: string;

  @ApiProperty({ example: "15:30", description: "End time (HH:mm)" })
  @Field()
  @IsMilitaryTime()
  end_time: string;

  @ApiProperty({ example: 1, description: "Room ID" })
  @Field()
  @IsNumber()
  roomId: number;

  @ApiProperty({ example: 3, description: "Group ID" })
  @Field()
  @IsNumber()
  groupId: number;

  @Field()
  teacherId: number[];
}
