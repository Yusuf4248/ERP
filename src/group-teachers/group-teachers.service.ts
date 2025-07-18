import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupTeacher } from "./entities/group-teacher.entity";
import { CreateGroupTeacherDto } from "./dto/create-group-teacher.dto";
import { UpdateGroupTeacherDto } from "./dto/update-group-teacher.dto";
import { Group } from "../group/entities/group.entity";
import { Teacher } from "../teacher/entities/teacher.entity";

@Injectable()
export class GroupTeachersService {
  constructor(
    @InjectRepository(GroupTeacher)
    private readonly groupTeacherRepository: Repository<GroupTeacher>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>
  ) {}

  async create(
    createGroupTeacherDto: CreateGroupTeacherDto
  ): Promise<GroupTeacher> {
    const group = await this.groupRepository.findOne({
      where: { id: createGroupTeacherDto.groupId },
    });
    if (!group) throw new NotFoundException("Group not found");

    const teacher = await this.teacherRepository.findOne({
      where: { id: createGroupTeacherDto.teacherId },
    });
    if (!teacher) throw new NotFoundException("Teacher not found");

    const newGroupTeacher = this.groupTeacherRepository.create({
      ...createGroupTeacherDto,
      group,
      teacher,
    });

    return this.groupTeacherRepository.save(newGroupTeacher);
  }

  findAll(): Promise<GroupTeacher[]> {
    return this.groupTeacherRepository.find({
      relations: ["group", "teacher"],
      order: {
        id: "ASC",
      },
    });
  }

  async findOne(id: number): Promise<GroupTeacher> {
    const groupTeacher = await this.groupTeacherRepository.findOne({
      where: { id },
      relations: ["group", "teacher"],
      order: {
        id: "ASC",
      },
    });
    if (!groupTeacher) throw new NotFoundException("GroupTeacher not found");
    return groupTeacher;
  }

  async update(
    id: number,
    updateDto: UpdateGroupTeacherDto
  ): Promise<GroupTeacher> {
    const groupTeacher = await this.groupTeacherRepository.findOneBy({ id });
    if (!groupTeacher) throw new NotFoundException("GroupTeacher not found");

    if (updateDto.groupId) {
      const group = await this.groupRepository.findOneBy({
        id: updateDto.groupId,
      });
      if (!group) throw new NotFoundException("Group not found");
      groupTeacher.group = group;
    }

    if (updateDto.teacherId) {
      const teacher = await this.teacherRepository.findOneBy({
        id: updateDto.teacherId,
      });
      if (!teacher) throw new NotFoundException("Teacher not found");
      groupTeacher.teacher = teacher;
    }

    if (typeof updateDto.status === "boolean") {
      groupTeacher.status = updateDto.status;
    }

    return this.groupTeacherRepository.save(groupTeacher);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.groupTeacherRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("GroupTeacher not found");
    }
    return { message: "GroupTeacher deleted successfully" };
  }
}
