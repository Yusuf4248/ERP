import { Field, InputType } from "@nestjs/graphql";
import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

@InputType()
export class UpdateAttendanceDto {
  @Field()
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  scheduleId: number;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  status: string;
}
