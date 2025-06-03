import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class VerifyOtpDto {
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  verification_key?: string;
}
