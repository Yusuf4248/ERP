import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";
import { TeacherService } from "../teacher/teacher.service";
import { HomeworkSubmissionService } from "../homework-submission/homework-submission.service";

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade) private readonly gradeRepo: Repository<Grade>,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly homeworkSubmissionService: HomeworkSubmissionService
  ) {}
  async create(createGradeDto: CreateGradeDto) {
    const { student } = await this.studentService.findOne(
      createGradeDto.studentId
    );
    const { teacher } = await this.teacherService.findOne(
      createGradeDto.teacherId
    );
    const { homework_submission } =
      await this.homeworkSubmissionService.findOne(
        createGradeDto.homeworkSubmissionId
      );
    const newGrade = await this.gradeRepo.save({
      student,
      teacher,
      homework_submission,
      ...createGradeDto,
    });
    return {
      message: "homework was graded",
      success: true,
      newGrade,
    };
  }

  async findAll() {
    const grades = await this.gradeRepo.find({
      relations: ["teacher", "student", "homework_submission"],
    });
    if (grades.length == 0) {
      throw new NotFoundException("Grade not found");
    }
    return {
      success: true,
      grades,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const grade = await this.gradeRepo.findOne({
      where: { id },
      relations: ["teacher", "student", "homework_submission"],
    });
    if (!grade) {
      throw new NotFoundException(`a ${id} grade not found`);
    }
    return {
      message: `a ${id} grade`,
      success: true,
      grade,
    };
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.gradeRepo.update({ id }, updateGradeDto);

    const grade = await this.findOne(id);
    return {
      message: "Grade updated",
      success: true,
      grade,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.gradeRepo.delete(id);

    return {
      message: `a ${id} grade deleted`,
      success: true,
    };
  }
}
