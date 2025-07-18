import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { AttendanceStatus } from "../entities/attendance.entity";

export class UpdateAttendanceDto {
  @ApiProperty({
    example: 1,
    description: "Student's unique ID",
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  studentId?: number;

  @ApiProperty({
    example: 5,
    description: "Lesson's unique ID",
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  lessonId?: number;

  @ApiProperty({
    example: "2025-07-16T09:00:00.000Z",
    description: "Date of the attendance (ISO format)",
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  date?: Date;

  @ApiProperty({
    enum: AttendanceStatus,
    description: "Attendance status of the student",
    example: AttendanceStatus.CAME,
  })
  @IsOptional()
  @IsEnum(AttendanceStatus)
  status?: AttendanceStatus;

  @ApiProperty({
    example: "Was late to class due to a specific reason.",
    description:
      "Description of whether the student attended the class or not.",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
