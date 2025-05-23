import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsInt, Min, MaxLength } from "class-validator";

@InputType()
export class CreateCourseDto {
  @Field()
  @IsString()
  @MaxLength(100)
  title: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @IsString()
  duration: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  lessons_in_a_week: number;

  @Field()
  @IsString()
  lesson_duration: string;
}
