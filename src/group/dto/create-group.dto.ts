import {
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsString,
  IsOptional,
  IsArray,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GroupStatus } from "../entities/group.entity";
import { Field } from "@nestjs/graphql";

export class CreateGroupDto {
  @ApiProperty({ example: "Frontend N1" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  course_id: number;

  @ApiProperty({ example: "2025-06-01" })
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: "2025-09-01" })
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @ApiProperty({ enum: GroupStatus, example: GroupStatus.NEW })
  @IsEnum(GroupStatus)
  status: GroupStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsArray()
  teacherId?: number[];
}
