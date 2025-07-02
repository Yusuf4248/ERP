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
import { Media } from "../media/entities/media.entity";
import { FileService } from "../file/file.service";
import * as path from "path";

@Injectable()
export class HomeworkSubmissionService {
  constructor(
    @InjectRepository(HomeworkSubmission)
    private readonly homeworkSubmissionRepo: Repository<HomeworkSubmission>,
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    private readonly studentService: StudentService,
    private readonly homeworkService: HomeworksService,
    private readonly fileService: FileService
  ) {}
  async create(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto) {
    const { student } = await this.studentService.findOne(
      createHomeworkSubmissionDto.studentId
    );
    const { homework } = await this.homeworkService.findOne(
      createHomeworkSubmissionDto.homeworkId
    );
    const newHomeworkSubmission = await this.homeworkSubmissionRepo.save({
      ...createHomeworkSubmissionDto,
      homework,
      student,
    });
    return {
      message: "New homework submission created!",
      success: true,
      newHomeworkSubmission,
    };
  }

  async uploadMedia(id: number, file: Express.Multer.File, file_title: string) {
    const fileSizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    const fileType = file.mimetype;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "media",
      "homework-submission"
    );
    const fileName = await this.fileService.saveFile(file, filePath);
    const media = await this.mediaRepo.save({
      files: fileName,
      file_name: file_title,
      table_id: id,
      table_name: "homework-submission",
      type: fileType,
      size: +fileSizeInMb,
    });
    return media;
  }

  async findAll() {
    const homework_submission = await this.homeworkSubmissionRepo.find({
      relations: ["student", "homework"],
    });
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
    await this.findOne(id);
    await this.homeworkSubmissionRepo.delete(id);
    return {
      message: `Homework submission-${id} deleted`,
      success: true,
    };
  }
}
