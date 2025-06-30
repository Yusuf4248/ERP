import { InputType, PartialType } from "@nestjs/graphql";
import {
  ApiPropertyOptional,
  PartialType as SwaggerPartialType,
} from "@nestjs/swagger";
import { CreateLessonDto } from "./create-lesson.dto";

@InputType()
export class UpdateLessonDto extends PartialType(CreateLessonDto) {}

export class UpdateLessonSwaggerDto extends SwaggerPartialType(
  CreateLessonDto
) {}
