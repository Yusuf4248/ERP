import { ApiProperty } from "@nestjs/swagger";
import { InputType, Field, Int } from "@nestjs/graphql";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MaxLength,
  MinLength,
  Min,
} from "class-validator";
import { LessonStatus } from "../entities/lesson.entity";

@InputType()
export class CreateLessonDto {
  @ApiProperty({
    example: "Math lesson",
    description: "Lesson title, 3–100 characters",
    minLength: 3,
    maxLength: 100,
  })
  @Field()
  @IsString({ message: "Title must be a string" })
  @MinLength(3, { message: "Title must be at least 3 characters long" })
  @MaxLength(100, { message: "Title must be at most 100 characters long" })
  @IsNotEmpty({ message: "Title is required" })
  title: string;

  @ApiProperty({
    example: "This lesson is about algebra",
    description: "Lesson notes, at least 10 characters",
    minLength: 10,
    maxLength: 500,
  })
  @Field()
  @IsString({ message: "Notes must be a string" })
  @MinLength(10, { message: "Notes must be at least 10 characters long" })
  @MaxLength(500, { message: "Notes must be at most 500 characters long" })
  @IsNotEmpty({ message: "Notes are required" })
  notes: string;

  @ApiProperty({
    enum: LessonStatus,
    default: LessonStatus.YANGI,
    description: "Status of the lesson",
    required: false,
  })
  @Field(() => LessonStatus, { nullable: true })
  @IsEnum(LessonStatus, {
    message:
      "Status must be one of: yangi, bekor qilingan, kechiktirilgan, yakunlangan",
  })
  @IsOptional()
  status?: LessonStatus;

  @ApiProperty({
    example: 1,
    description: "Group ID",
    required: false,
    minimum: 1,
  })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: "Group ID must be an integer" })
  @Min(1, { message: "Group ID must be at least 1" })
  groupId: number;
}
