import { IsBoolean, IsDate, IsDateString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterEventDto {
  @ApiProperty({ example: "2025-05-01T00:00:00Z" })
  @IsDate()
  @IsNotEmpty()
  start?: string;

  @ApiProperty({ example: "2025-05-31T23:59:59Z" })
  @IsDate()
  @IsNotEmpty()
  end?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active?: boolean;
}
