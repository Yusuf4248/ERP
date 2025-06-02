import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
} from "class-validator";
import { Column } from "typeorm";

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

  @Field()
  examId: number[];

  @Field()
  groupId: number[];

  @Field()
  branchId: number[];
}
