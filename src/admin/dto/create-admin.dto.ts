import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsPhoneNumber,
  IsStrongPassword,
} from "class-validator";

@InputType()
export class CreateAdminDto {
  @ApiProperty({ example: "Ali", description: "Adminning ismi" })
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  @Field()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Adminning familiyasi" })
  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @Field()
  last_name: string;

  @ApiProperty({
    example: "ali.valiyev@gmail.com",
    description: "Yagona email manzili",
  })
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  @Field()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Yagona telefon raqami",
  })
  @IsString()
  @IsNotEmpty({ message: "Phone number is required" })
  @IsPhoneNumber("UZ")
  @Field()
  phone: string;

  @ApiProperty({
    example: "StrongPassword123!",
    description: "Parol (hash emas, raw password)",
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @IsStrongPassword()
  @Field()
  password_hash: string;
}
