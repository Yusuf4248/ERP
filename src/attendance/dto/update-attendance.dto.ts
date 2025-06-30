import { Field, InputType } from "@nestjs/graphql";
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

@InputType()
export class UpdateAttendanceDto {
  @Field()
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  studentId?: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  @IsOptional()
  lessonId?: number;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  date?: Date;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  status?: string;
}
