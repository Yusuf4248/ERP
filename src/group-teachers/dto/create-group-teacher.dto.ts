import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateGroupTeacherDto {
  @ApiProperty({ example: 2, description: "Group ID" })
  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  @ApiProperty({ example: 5, description: "Teacher ID" })
  @IsNumber()
  @IsNotEmpty()
  teacherId: number;

  @ApiProperty({
    example: true,
    description: "Status of the teacher in the group (active/inactive)",
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
