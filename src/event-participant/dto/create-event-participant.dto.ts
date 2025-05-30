import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt } from "class-validator";

export class CreateEventParticipantDto {
  @ApiProperty({ example: 1, description: "Talaba ID raqami" })
  @IsInt()
  student_id: number;

  @ApiProperty({ example: 2, description: "Tadbir ID raqami" })
  @IsInt()
  event_id: number;

  @ApiProperty({
    example: true,
    description: "Status: ishtirok etyaptimi yoki yo'qmi",
  })
  @IsBoolean()
  status: boolean;
}
