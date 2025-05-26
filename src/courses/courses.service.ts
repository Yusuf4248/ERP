import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const newCourse = await this.courseRepo.save(createCourseDto);
    return {
      message: "New course created!",
      success: true,
      newCourse,
    };
  }

  async findAll() {
    const courses = await this.courseRepo.find({ relations: ["groups"] });
    if (courses.length == 0) {
      throw new NotFoundException("Course not found");
    }
    return {
      success: true,
      message: "Courses:",
      courses,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(id) || Number(id) <= 0) {
      throw new BadRequestException("ID must be integer and greater than zero");
    }
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ["groups"],
    });
    if (!course) {
      throw new NotFoundException(`${id}-course not found`);
    }
    return {
      success: true,
      course,
    };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    if (!Number.isInteger(id) || Number(id) <= 0) {
      throw new BadRequestException("ID must be integer and greater than zero");
    }
    await this.findOne(id);
    await this.courseRepo.update({ id }, updateCourseDto);

    const course = await this.findOne(id);
    return {
      message: "Course data updated!",
      success: true,
      course,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(id) || Number(id) <= 0) {
      throw new BadRequestException("ID must be integer and greater than zero");
    }
    await this.findOne(id);
    await this.courseRepo.delete({ id });
    return {
      message: `${id}-id course deleted`,
      success: true,
    };
  }
}
