import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateExamDto } from "./dto/create-exam.dto";
import { UpdateExamDto } from "./dto/update-exam.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Exam } from "./entities/exam.entity";
import { In, Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { RoomsService } from "../rooms/rooms.service";
import { Teacher } from "../teacher/entities/teacher.entity";

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private readonly examRepo: Repository<Exam>,
    private readonly groupService: GroupService,
    private readonly roomService: RoomsService,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>
  ) {}
  async create(createExamDto: CreateExamDto) {
    const { group } = await this.groupService.findOne(createExamDto.groupId);
    const { room } = await this.roomService.findOne(createExamDto.roomId);
    const teacher = await this.teacherRepo.find({
      where: { id: In(createExamDto.teacherId) },
    });
    const newExam = await this.examRepo.save({
      ...createExamDto,
      group,
      room,
      teacher,
    });
    return {
      message: "New exam created!",
      success: true,
      newExam,
    };
  }

  async findAll() {
    const exams = await this.examRepo.find({ relations: ["group", "room"] });
    if (exams.length == 0) {
      throw new NotFoundException("Exams not found");
    }
    return {
      message: "All exams",
      success: true,
      exams,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const exam = await this.examRepo.findOne({
      where: { id },
      relations: ["group", "room"],
    });
    if (!exam) {
      throw new NotFoundException(`${id}-exam not found`);
    }
    return {
      message: `${id}-exam`,
      success: true,
      exam,
    };
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.examRepo.update({ id }, updateExamDto);
    const { exam } = await this.findOne(id);

    return {
      message: `${id}-exam data updated!`,
      success: true,
      exam,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.examRepo.delete(id);

    return {
      message: `${id}-exam deleted!`,
      success: true,
    };
  }
}
