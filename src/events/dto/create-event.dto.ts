import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  Min,
  Max,
  IsPositive,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateEventDto {
  @ApiProperty({
    example: "Frontend Bootcamp",
    description: "Tadbirning nomi, kamida 3 ta belgidan iborat bo'lishi kerak",
  })
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "3 kunlik intensiv React kursi",
    description: "Tadbirning batafsil tavsifi",
  })
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Tadbir boshlanish vaqti (ISO formatda)",
  })
  @Field()
  @Type(() => Date)
  @IsDate({ message: "start_time haqiqiy sana bo'lishi kerak" })
  start_time: Date;

  @ApiProperty({
    example: "2025-06-03T17:00:00.000Z",
    description: "Tadbir tugash vaqti (ISO formatda)",
  })
  @Field()
  @Type(() => Date)
  @IsDate({ message: "end_time haqiqiy sana bo'lishi kerak" })
  end_time: Date;

  @ApiProperty({
    example: 50,
    description:
      "Maksimal ishtirokchilar soni, ijobiy butun son bo'lishi kerak",
  })
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(1000, { message: "max_participants 1000 dan oshmasligi kerak" })
  max_participants: number;

  @ApiProperty({
    example: 3,
    description:
      "Filial ID raqami (branchId), mavjud filialga tegishli bo'lishi kerak",
  })
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  branchId: number;

  @Field(() => [Int])
  studentsId: number[];
}
