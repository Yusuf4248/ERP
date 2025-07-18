import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "./entities/attendance.entity";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";
import { LessonsService } from "../lessons/lessons.service";
import { Student } from "../student/entities/student.entities";
import { Lesson } from "../lessons/entities/lesson.entity";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    private readonly studentService: StudentService,
    private readonly lessonService: LessonsService
  ) {}
  async create(createAttendanceDto: CreateAttendanceDto) {
    const { lessonId, studentId } = createAttendanceDto;
    const { student } = await this.studentService.findOne(studentId);
    const { lesson } = await this.lessonService.findOne(lessonId);
    const attendance = this.attendanceRepo.create({
      ...createAttendanceDto,
      lesson,
      student,
    });
    return this.attendanceRepo.save(attendance);
  }

  async findAll() {
    const attendance = await this.attendanceRepo.find({
      relations: ["student", "lesson"],
    });
    return {
      message: "All attandances",
      success: true,
      attendance,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const attandance = await this.attendanceRepo.findOne({
      where: { id },
      relations: ["student", "lesson"],
    });
    if (!attandance) {
      throw new NotFoundException(`${id}-attandances not found`);
    }
    return {
      message: `${id}-attandances`,
      success: true,
      attandance,
    };
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    await this.findOne(id);

    let student: Student | null = null;
    let lesson: Lesson | null = null;

    if (updateAttendanceDto.studentId) {
      const newStudent = await this.studentService.findOne(
        updateAttendanceDto.studentId
      );
      student = newStudent.student;
    }

    if (updateAttendanceDto.lessonId) {
      const newLesson = await this.lessonService.findOne(
        updateAttendanceDto.lessonId
      );
      lesson = newLesson.lesson;
    }

    const updateData: any = {
      ...updateAttendanceDto,
      ...(student && { student }),
      ...(lesson && { lesson }),
    };

    await this.attendanceRepo.update({ id }, updateData);

    const attandance = await this.findOne(id);

    return {
      message: `${id}-attendance data updated!`,
      success: true,
      attandance,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.attendanceRepo.delete(id);

    return {
      message: `${id}-attandance deleted!`,
      success: true,
    };
  }
}
