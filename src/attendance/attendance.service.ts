import { BadRequestException, Injectable } from "@nestjs/common";
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
    const student = await this.studentService.findOne(studentId);
    if (!student) {
      throw new BadRequestException("Student Not Found!");
    }
    const schedule = await this.scheduleService.findOne(scheduleId);
    if (!schedule) {
      throw new BadRequestException("Schedule not found");
    }
    const attendance = this.attendanceRepo.create({
      schedule: schedule,
      student: student.student,
      ...otherDto,
    });
    return this.attendanceRepo.save(attendance);
  }

  findAll() {
    return this.attendanceRepo.find({ relations: ["student", "schedule"] });
  }

  findOne(id: number) {
    return this.attendanceRepo.findOne({
      where: { id },
      relations: ["student", "schedule"],
    });
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepo.preload({ id, ...updateAttendanceDto });
  }

  remove(id: number) {
    return this.attendanceRepo.delete({ id });
  }
}
