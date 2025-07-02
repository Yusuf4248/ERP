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
import { SchedulesService } from "../schedules/schedules.service";
import { LessonsService } from "../lessons/lessons.service";

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
    await this.attendanceRepo.update({ id }, updateAttendanceDto);

    const { attandance } = await this.findOne(id);
    return {
      message: `${id}-attandance data updated!`,
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
