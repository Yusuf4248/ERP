import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { LidStatus } from "../entities/lid.entity";

export class GetLidsByStatusDto {
  @ApiProperty({
    enum: LidStatus,
    example: LidStatus.YANGI,
    description: "Lid statusi",
  })
  @IsEnum(LidStatus)
  status: LidStatus;
}
