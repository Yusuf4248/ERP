import {
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsString,
  IsMilitaryTime,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GroupStatus } from "../entities/group.entity";

export class CreateGroupDto {
  @ApiProperty({ example: "Frontend N1" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  course_id: number;

  @ApiProperty({ example: "2025-06-01" })
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: "2025-09-01" })
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @ApiProperty({ example: "08:30", description: "Group start time (HH:mm)" })
  @IsNotEmpty()
  @IsMilitaryTime({ message: "start_time format: HH:mm bo'lishi kerak" })
  start_time: string;

  @ApiProperty({ example: "11:30", description: "Group end time (HH:mm)" })
  @IsNotEmpty()
  @IsMilitaryTime({ message: "end_time format: HH:mm" })
  end_time: string;

  @ApiProperty({ enum: GroupStatus, example: GroupStatus.NEW })
  @IsEnum(GroupStatus)
  status: GroupStatus;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  roomId: number;
}
