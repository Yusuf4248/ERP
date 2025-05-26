import { Field, InputType } from "@nestjs/graphql";
import { IsInt } from "class-validator";

@InputType()
export class CreateTeacherGroupDto {
  @IsInt()
  @Field()
  teacher_id: number;

  @IsInt()
  @Field()
  group_id: number;
}
