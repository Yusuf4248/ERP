import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from "class-validator";

@InputType()
export class CreateScheduleDto {
  @ApiProperty({ example: 1, description: "Guruhning ID si" })
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Boshlanish vaqti ISO 8601 formatda",
  })
  @Field()
  @IsDateString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({
    example: "2025-06-03T17:00:00.000Z",
    description: "Tugash vaqti ISO 8601 formatda",
  })
  @Field()
  @IsDateString()
  @IsNotEmpty()
  end_time: string;

  @ApiProperty({ example: "Monday", description: "Haftaning kuni" })
  @Field()
  @IsString()
  @IsNotEmpty()
  day_of_week: string;

  @ApiProperty({
    example: 2,
    description: "Xona (room) ID si",
    required: false,
  })
  @Field(() => Int, { nullable: true })
  @IsNumber()
  roomId: number;

  @ApiProperty({
    example: "2025-01-01",
    description: "",
  })
  date: Date;
}
