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

@Injectable()
export class HomeworksService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>,
    private readonly groupService: GroupService,
    private readonly teacherService: TeacherService
  ) {}
  async create(createHomeworkDto: CreateHomeworkDto) {
    const group = await this.groupService.findOne(createHomeworkDto.groupId);
    const teacher = await this.teacherService.findOne(
      createHomeworkDto.teacherId
    );
    const newHomework = await this.homeworkRepo.save({
      ...createHomeworkDto,
      group: group.group,
      teacher: teacher.teacher,
    });
    return {
      message: "New homework created!",
      success: true,
      newHomework,
    };
  }

  async findAll() {
    const homework = await this.homeworkRepo.find({
      relations: ["teacher", "group"],
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
      relations: ["teacher", "group"],
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
