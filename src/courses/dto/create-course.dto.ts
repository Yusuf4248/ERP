import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, Min, MaxLength } from "class-validator";

@InputType()
export class CreateCourseDto {
  @ApiProperty({ example: "Frontend", maxLength: 100 })
  @Field()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: "Learn HTML and JS." })
  @Field()
  @IsString()
  description: string;

  @ApiProperty({ example: 250000 })
  @Field(() => Int)
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({ example: "2 months" })
  @Field()
  @IsString()
  duration: string;

  @ApiProperty({ example: 3 })
  @Field(() => Int)
  @IsInt()
  @Min(1)
  lessons_in_a_week: number;

  @ApiProperty({ example: "90 minutes" })
  @Field()
  @IsString()
  lesson_duration: string;
}
