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

export class CreateAttendanceDto {
  @ApiProperty({
    example: 1,
    description: "Student's unique ID",
  })
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @ApiProperty({
    example: 5,
    description: "Lesson's unique ID",
  })
  @IsNotEmpty()
  @IsInt()
  lessonId: number;

  @ApiProperty({
    example: "2025-07-16T09:00:00.000Z",
    description: "Date of the lesson (ISO format)",
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    enum: AttendanceStatus,
    description: "Attendance status of the student",
    example: AttendanceStatus.CAME,
  })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiProperty({
    example: "Was late to class due to a specific reason.",
    description:
      "Description of whether the student attended the class or not.",
  })
  @IsString()
  description: string;
}
