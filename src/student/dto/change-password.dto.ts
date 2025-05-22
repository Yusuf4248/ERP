import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class ChangePasswordDto {
  @ApiProperty({
    example: "OldP@ssw0rd123",
    description: "Old (current) password of the user",
  })
  @IsNotEmpty({ message: "Old password should not be empty" })
  old_password: string;

  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  password: string;

  @ApiProperty({
    example: "NewP@ssw0rd456",
    description: "Confirm new password (must match password)",
  })
  @IsNotEmpty()
  confirm_password: string;
}
