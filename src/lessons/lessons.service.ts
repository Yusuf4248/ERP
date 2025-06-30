import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { SchedulesService } from "../schedules/schedules.service";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
    private readonly groupService: GroupService,
    private readonly scheduleService: SchedulesService
  ) {}
  async create(createLessonDto: CreateLessonDto) {
    const { groupId, scheduleId } = createLessonDto;
    const { group } = await this.groupService.findOne(groupId);
    const { schedule } = await this.scheduleService.findOne(scheduleId);
    const lesson = await this.lessonRepo.save({
      ...createLessonDto,
      group,
      schedule,
    });
    return {
      message: `New lesson created`,
      success: true,
      lesson,
    };
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [lessons, total] = await this.lessonRepo.findAndCount({
      relations: ["group", "schedule"],
      skip,
      take: limit,
      order: { id: "DESC" },
    });
    if (lessons.length == 0) {
      throw new NotFoundException("Lessons not found!");
    }
    return {
      success: true,
      total,
      page,
      limit,
      lessons,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ["group", "schedule"],
    });
    if (!lesson) {
      throw new NotFoundException(
        `${id}-lesson not found.Please check id and try again`
      );
    }
    return {
      success: true,
      message: `${id}-lesson`,
      lesson,
    };
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    await this.findOne(id);
    await this.lessonRepo.update({ id }, updateLessonDto);
    const { lesson } = await this.findOne(id);
    return {
      success: true,
      message: `${id}-lesson data updated`,
      lesson,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.lessonRepo.delete(id);

    return {
      success: true,
      message: `${id}-lesson data deleted`,
    };
  }

  async findAllLessonsByGroup(
    groupId: number,
    page: number,
    limit: number,
    user: { id: number; role: string }
  ) {
    let isAllowed: boolean = false;
    const { id, role } = user;
    console.log(user);
    // const { group } = await this.groupService.findOne(groupId);
  }
}
