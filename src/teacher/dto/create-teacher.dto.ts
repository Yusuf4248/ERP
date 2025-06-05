import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsOptional,
} from "class-validator";

@InputType()
export class CreateTeacherDto {
  @ApiProperty({ example: "Ali" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  first_name: string;

  @ApiProperty({ example: "Valiyev" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  last_name: string;

  @ApiProperty({ example: "ali@example.com" })
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @ApiProperty({ example: "P@ssw0rd!" })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      "Password must contain uppercase, lowercase, number and special character",
  })
  @Field()
  password: string;

  @ApiProperty({ example: "+998901234567" })
  @IsString()
  @IsPhoneNumber("UZ")
  @Field()
  phone: string;

  @ApiProperty({
    example: "main teacher",
    enum: ["assistant teacher", "main teacher"],
  })
  @IsEnum(["assistant teacher", "main teacher"])
  @Field()
  role: "assistant teacher" | "main teacher";

  @ApiProperty({
    example: [1, 2],
    description: "IDs of exams the teacher is related to",
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Field(() => [Int])
  @IsOptional()
  examId?: number[];

  @ApiProperty({
    example: [3, 4],
    description: "IDs of groups the teacher is assigned to",
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Field(() => [Int])
  @IsOptional()
  groupId?: number[];

  @ApiProperty({
    example: [5],
    description: "IDs of branches the teacher works at",
    isArray: true,
    type: Number,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Field(() => [Int])
  @IsOptional()
  branchId?: number[];
}
