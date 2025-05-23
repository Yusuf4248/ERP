import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
  MinLength,
  MaxLength,
} from "class-validator";

@InputType()
export class CreateStudentDto {
  @ApiProperty({
    example: `Ali`,
    description: `O'quvchining ismi`,
  })
  @IsString({ message: `Ism satr (string) bo'lishi kerak` })
  @MinLength(2, { message: `Ism kamida 2 ta belgidan iborat bo'lishi kerak` })
  @MaxLength(50, { message: `Ism 50 belgidan oshmasligi kerak` })
  @Field()
  first_name: string;

  @ApiProperty({
    example: `Valiyev`,
    description: `O'quvchining familiyasi`,
  })
  @IsString({ message: `Familiya satr (string) bo'lishi kerak` })
  @MinLength(2, {
    message: `Familiya kamida 2 ta belgidan iborat bo'lishi kerak`,
  })
  @MaxLength(50, { message: `Familiya 50 belgidan oshmasligi kerak` })
  @Field()
  last_name: string;

  @ApiProperty({
    example: `ali.valiyev@gmail.com`,
    description: `O'quvchining email manzili`,
  })
  @IsEmail({}, { message: `Email manzili noto'g'ri formatda` })
  @Field()
  email: string;

  @ApiProperty({
    example: `+998901234567`,
    description: `Telefon raqami (xalqaro formatda)`,
  })
  @IsPhoneNumber(`UZ`, { message: `Telefon raqami noto'g'ri` })
  @Field()
  phone: string;

  @ApiProperty({
    example: `AliValiyev123!`,
    description: `O'quvchining paroli (hashed holda saqlanadi)`,
  })
  @IsString({ message: `Parol satr bo'lishi kerak` })
  @MinLength(8, { message: `Parol kamida 8 ta belgidan iborat bo'lishi kerak` })
  @Field()
  password_hash: string;

  @IsString({ message: `Parol satr bo'lishi kerak` })
  @MinLength(8, { message: `Parol kamida 8 ta belgidan iborat bo'lishi kerak` })
  @Field()
  confirm_password: string;

  @ApiProperty({
    example: `male`,
    description: `Jinsi (male yoki female)`,
  })
  @IsEnum([`male`, `female`], {
    message: `Jins faqat "male" yoki "female" bo'lishi kerak`,
  })
  @Field()
  gender: `male` | `female`;

  @ApiProperty({
    example: `2005-06-15`,
    description: `Tug'ilgan sana (YYYY-MM-DD formatda)`,
  })
  @IsDateString(
    {},
    { message: `Tug'ilgan sana to'g'ri formatda bo'lishi kerak (YYYY-MM-DD)` }
  )
  @Field()
  date_of_birth: Date;
}
