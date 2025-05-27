import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateHomeworkSubmissionDto } from "./dto/create-homework-submission.dto";
import { UpdateHomeworkSubmissionDto } from "./dto/update-homework-submission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { HomeworkSubmission } from "./entities/homework-submission.entity";
import { Repository } from "typeorm";
import { StudentService } from "../student/student.service";
import { HomeworksService } from "../homeworks/homeworks.service";

@Injectable()
export class HomeworkSubmissionService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private readonly homeworkSubmissionRepo: Repository<HomeworkSubmission>,
    private readonly studentService: StudentService,
    private readonly homeworkService: HomeworksService
  ) {}
  async create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
    const student = await this.studentService.findOne(
      createHomeworkSubmissionDto.studentId
    );
    const homework = await this.homeworkService.findOne(
      createHomeworkSubmissionDto.homeworkId
    );
    const newHomeworkSubmission = await this.homeworkSubmissionRepo.save({
      ...createHomeworkSubmissionDto,
      homework: homework.homework,
      student: student.student,
    });
    return {
      message: "New homework submission created!",
      success: true,
      newHomeworkSubmission,
    };
  }

  async findAll() {
    const homework_submission = await this.homeworkSubmissionRepo.find({
      relations: ["student", "homework"],
    });
    if (homework_submission.length == 0) {
      throw new NotFoundException("Homework submission not found");
    }
    return {
      success: true,
      homework_submission,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const homework_submission = await this.homeworkSubmissionRepo.findOne({
      where: { id },
      relations: ["student", "homework"],
    });
    if (!homework_submission) {
      throw new NotFoundException(`Homework submission-${id} not found`);
    }
    return {
      message: `Homework submission-${id}`,
      success: true,
      homework_submission,
    };
  }

  async update(
    id: number,
    updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto
  ) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.homeworkSubmissionRepo.update(
      { id },
      updateHomeworkSubmissionDto
    );
    const homework_submission = await this.findOne(id);
    return {
      message: "Homework submission data changed!",
      success: true,
      homework_submission,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.homeworkSubmissionRepo.delete(id);
    return {
      message: `Homework submission-${id} deleted`,
      success: true,
    };
  }
}
