import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { In, Repository } from "typeorm";
import { CoursesService } from "../courses/courses.service";
import { Teacher } from "../teacher/entities/teacher.entity";
import { Student } from "../student/entities/student.entities";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentrRepo: Repository<Student>,
    private readonly courseService: CoursesService
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    let teachers: Teacher[] = [];
    const { course_id, teacherId } = createGroupDto;
    const { course } = await this.courseService.findOne(+course_id);
    if (teacherId) {
      teachers = await this.teacherRepo.find({
        where: { id: In(teacherId) },
      });
    }

    const newGroup = await this.groupRepo.save({
      ...createGroupDto,
      course,
      teachers,
    });
    return {
      message: "New group created successfully!",
      success: true,
      newGroup,
    };
  }

  async findAll() {
    const groups = await this.groupRepo.find({
      relations: ["students", "teachers", "course"],
    });
    if (groups.length == 0) {
      throw new NotFoundException("Groups not found");
    }
    return {
      success: true,
      groups,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ["course", "teachers", "students"],
    });
    if (!group) {
      throw new NotFoundException(`Group ID-${id} not found`);
    }
    return {
      message: `Group ID-${id}`,
      success: true,
      group,
    };
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.groupRepo.update({ id }, updateGroupDto);

    const group = await this.findOne(id);
    return {
      message: `Group ID-${id} data updated`,
      success: true,
      group,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.groupRepo.delete({ id });
    return {
      message: `Group id-${id} deleted`,
      success: true,
    };
  }

  async addStudentToGroup(group_id: number, student_id: number) {
    const { group } = await this.findOne(group_id);
    const student = await this.studentrRepo.findOne({
      where: { id: student_id },
    });
    if (!student) {
      throw new BadRequestException(`${student_id}-student not found!`);
    }
    const isAlreadyExists = group.students.find((s) => s.id === student.id);
    if (isAlreadyExists) {
      throw new BadRequestException(
        "This student already exists in this group"
      );
    }
    group.students.push(student);
    return this.groupRepo.save(group);
  }

  async removeStudentFromGroup(group_id: number, student_id: number) {
    const { group } = await this.findOne(group_id);
    const studentIndex = group.students.findIndex((s) => s.id === student_id);
    if (studentIndex === -1) {
      throw new NotFoundException("Student is not in this group");
    }
    group.students.splice(studentIndex, 1);
    return this.groupRepo.save(group);
  }
}
