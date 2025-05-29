import { IsBoolean, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterEventDto {
  @ApiProperty({ example: "2025-05-01T00:00:00Z" })
  start?: string;

  @ApiProperty({ example: "2025-05-31T23:59:59Z" })
  end?: string;

  @ApiProperty({ example: true })
  is_active?: boolean;
}
