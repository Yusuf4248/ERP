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

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    private readonly studentService: StudentService,
    private readonly scheduleService: SchedulesService
  ) {}
  async create(createAttendanceDto: CreateAttendanceDto) {
    const { scheduleId, studentId, ...otherDto } = createAttendanceDto;
    const { student } = await this.studentService.findOne(studentId);
    const { schedule } = await this.scheduleService.findOne(scheduleId);
    const attendance = this.attendanceRepo.create({
      schedule: schedule,
      student: student,
      ...otherDto,
    });
    return this.attendanceRepo.save(attendance);
  }

  async findAll() {
    const attendance = await this.attendanceRepo.find({
      relations: ["student", "schedule"],
    });
    if (attendance.length == 0) {
      throw new NotFoundException("Attendance not found");
    }
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
      relations: ["student", "schedule"],
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
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
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
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.attendanceRepo.delete(id);

    return {
      message: `${id}-attandance deleted!`,
      success: true,
    };
  }
}
