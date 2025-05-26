import { Injectable } from "@nestjs/common";
import { CreateTeacherGroupDto } from "./dto/create-teacher-group.dto";
import { UpdateTeacherGroupDto } from "./dto/update-teacher-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TeacherGroup } from "./entities/teacher-group.entity";
import { Repository } from "typeorm";
import { TeacherService } from "../teacher/teacher.service";
import { GroupService } from "../group/group.service";

@Injectable()
export class TeacherGroupsService {
  constructor(
    @InjectRepository(TeacherGroup)
    private readonly teacherGroupRepo: Repository<TeacherGroup>,
    private readonly teacherService: TeacherService,
    private readonly groupService: GroupService
  ) {}
  async create(createTeacherGroupDto: CreateTeacherGroupDto) {
    const teacher = await this.teacherService.findOne(
      createTeacherGroupDto.teacher_id
    );
    const group = await this.groupService.findOne(
      createTeacherGroupDto.group_id
    );
    const teacherGroup = this.teacherGroupRepo.create({
      ...teacher,
      ...group,
    });
    return await this.teacherGroupRepo.save(teacherGroup);
  }

  findAll() {
    return this.teacherGroupRepo.find({ relations: ["teacher", "group"] });
  }

  async findOne(id: number) {
    const tg = await this.teacherGroupRepo.findOne({ where: { id } });
  }

  update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
    return `This action updates a #${id} teacherGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherGroup`;
  }
}
