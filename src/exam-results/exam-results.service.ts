import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateExamResultDto } from "./dto/create-exam-result.dto";
import { UpdateExamResultDto } from "./dto/update-exam-result.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExamResult } from "./entities/exam-result.entity";
import { StudentService } from "../student/student.service";
import { ExamsService } from "../exams/exams.service";

@Injectable()
export class ExamResultsService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepo: Repository<ExamResult>,
    private readonly studentService: StudentService,
    private readonly examService: ExamsService
  ) {}
  async create(createExamResultDto: CreateExamResultDto) {
    const { student } = await this.studentService.findOne(
      createExamResultDto.studentId
    );
    const { exam } = await this.examService.findOne(createExamResultDto.examId);
    const newExamResult = await this.examResultRepo.save({
      ...createExamResultDto,
      exam,
      student,
    });
    return {
      message: "New exam result created",
      success: true,
      newExamResult,
    };
  }

  async findAll() {
    const examResults = await this.examResultRepo.find({
      relations: ["exam", "student"],
    });
    if (examResults.length == 0) {
      throw new NotFoundException("Exam result not found");
    }
    return {
      message: "All exam results",
      success: true,
      examResults,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const examResult = await this.examResultRepo.findOne({
      where: { id },
      relations: ["exam", "student"],
    });
    if (!examResult) {
      throw new NotFoundException(`${id}-exam result not found`);
    }
    return {
      message: `${id}-exam result`,
      success: true,
      examResult,
    };
  }

  async update(id: number, updateExamResultDto: UpdateExamResultDto) {
    await this.findOne(id);
    await this.examResultRepo.update({ id }, updateExamResultDto);

    const { examResult } = await this.findOne(id);

    return {
      message: `${id}-exam result data updated`,
      success: true,
      examResult,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.examResultRepo.delete(id);

    return {
      message: `${id}-exam result data updated`,
      success: true,
    };
  }
}
