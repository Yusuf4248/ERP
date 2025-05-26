import { Field, ID, InputType } from "@nestjs/graphql";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class CreateStudentGroupDto {
  @IsNotEmpty()
  @IsInt()
  @Field(()=>ID)
  studentId: number

  @IsNotEmpty()
  @IsInt()
  @Field()
  groupId: number;

  @IsNotEmpty()
  @Field()
  @IsDateString()
  period: Date;

  @Field()
  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
