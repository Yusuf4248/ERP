import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { addDays, addMonths, isBefore } from "date-fns";
import { Group } from "../group/entities/group.entity";

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepo: Repository<Lesson>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>
  ) {}
  async create(createLessonDto: CreateLessonDto) {
    const { groupId } = createLessonDto;
    const { group } = await this.groupService.findOne(groupId);
    const lesson = await this.lessonRepo.save({
      ...createLessonDto,
      group,
    });
    return {
      message: `New lesson created`,
      success: true,
      lesson,
    };
  }

  async createAllLessons({
    roomId,
    groupId,
  }: {
    roomId: number;
    groupId: number;
  }) {
    const lessonDates = await this.generateLessonDates(groupId);
    // shu yergacha ishladi
    const group = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ["course"],
    });

    const lessons: Lesson[] = [];

    for (let i = 0; i < lessonDates.length; i++) {
      const date = lessonDates[i];

      const lesson = await this.lessonRepo.save({
        group: { ...group },
        date,
        title: `Lesson ${i + 1}`,
        notes: `Lesson ${i + 1} note`,
        room: { id: roomId },
      });

      lessons.push(lesson);
    }
    return lessons;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [lessons, total] = await this.lessonRepo.findAndCount({
      relations: ["group"],
      skip,
      take: limit,
      order: { id: "ASC" },
    });
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

  async generateLessonDates(groupId: number) {
    const group = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ["course"],
    });
    if (!group) {
      throw new NotFoundException(`Group ID-${groupId} not found`);
    }
    const lessonDates: Date[] = [];
    // +++++++++++++++++++++++++++++++++++
    const startDate: Date = new Date(group.start_date);
    const endDate: Date = new Date(group.end_date);

    endDate.setMonth(endDate.getMonth() + Number(group.course.duration));

    let currentDate = new Date(group.start_date);
    let weeklyLessonCount: number = 0;

    while (isBefore(currentDate, endDate)) {
      const dayOfWeek = currentDate.getDay(); // 0 - Yakshanba, 6 - Shanba

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        if (weeklyLessonCount < group.course.lessons_in_a_week) {
          lessonDates.push(new Date(currentDate));
          weeklyLessonCount++;
        }
      }

      if (dayOfWeek === 0) {
        weeklyLessonCount = 0;
      }

      currentDate = addDays(currentDate, 1);
    }
    return lessonDates;
  }

  // async findAllLessonsByGroup(
  //   groupId: number,
  //   page: number,
  //   limit: number,
  //   user: { id: number; role: string }
  // ) {
  //   let isAllowed: boolean = false;
  //   const { id, role } = user;
  //   console.log(user);
  //   // const { group } = await this.groupService.findOne(groupId);
  // }
}
