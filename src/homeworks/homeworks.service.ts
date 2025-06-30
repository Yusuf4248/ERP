import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Homework } from "./entities/homework.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { TeacherService } from "../teacher/teacher.service";
import { Media } from "../media/entities/media.entity";
import * as path from "path";
import { FileService } from "../file/file.service";
import { LessonsService } from "../lessons/lessons.service";

@Injectable()
export class HomeworksService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>,
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    private readonly groupService: GroupService,
    private readonly teacherService: TeacherService,
    private readonly fileService: FileService,
    private readonly lessonService: LessonsService
  ) {}
  async create(createHomeworkDto: CreateHomeworkDto) {
    const { teacherId, groupId, lessonId } = createHomeworkDto;
    const { lesson } = await this.lessonService.findOne(lessonId);
    const { group } = await this.groupService.findOne(groupId);
    const { teacher } = await this.teacherService.findOne(teacherId);
    const isGiven = await this.homeworkRepo.findOne({
      where: { lesson: { id: lessonId } },
    });
    if (isGiven) {
      throw new BadRequestException(
        "Homework has already been assigned for this lesson"
      );
    }
    const newHomework = await this.homeworkRepo.save({
      ...createHomeworkDto,
      group,
      teacher,
      lesson,
    });
    return {
      message: "New homework created!",
      success: true,
      newHomework,
    };
  }

  async uploadMedia(id: number, file: Express.Multer.File, file_title: string) {
    const fileSizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    const fileType = file.mimetype;
    const filePath = path.join(__dirname, "..", "..", "media", "homework");
    const fileName = await this.fileService.saveFile(file, filePath);
    const media = await this.mediaRepo.save({
      files: fileName,
      file_name: file_title,
      table_id: id,
      table_name: "homework",
      type: fileType,
      size: +fileSizeInMb,
    });
    return media;
  }

  async findAll() {
    const homework = await this.homeworkRepo.find({
      relations: ["teacher", "group", "lesson"],
    });
    if (homework.length == 0) {
      throw new NotFoundException("Homework not found");
    }
    return {
      success: true,
      homework,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const homework = await this.homeworkRepo.findOne({
      where: { id },
      relations: ["teacher", "group", "lesson"],
    });
    if (!homework) {
      throw new NotFoundException(`Homework-${id} not found`);
    }
    return {
      message: `Homework-${id}`,
      success: true,
      homework,
    };
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.homeworkRepo.update({ id }, updateHomeworkDto);

    const homework = await this.findOne(id);
    return {
      message: "Homework data updated!",
      success: true,
      homework,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.homeworkRepo.delete(id);

    return {
      message: `Homework-${id} deleted!`,
      success: true,
    };
  }
}
