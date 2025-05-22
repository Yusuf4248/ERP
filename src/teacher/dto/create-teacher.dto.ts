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

export class CreateTeacherDto {
  @ApiProperty({ example: "Ali" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  first_name: string;

  @ApiProperty({ example: "Valiyev" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  last_name: string;

  @ApiProperty({ example: "ali@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "P@ssw0rd!" })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      "Password must contain uppercase, lowercase, number and special character",
  })
  password: string;

  @ApiProperty({ example: "+998901234567" })
  @IsString()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({
    example: "main teacher",
    enum: ["assistant teacher", "main teacher"],
  })
  @IsEnum(["assistant teacher", "main teacher"])
  role: "assistant teacher" | "main teacher";
}
