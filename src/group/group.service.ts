import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./entities/group.entity";
import { Repository } from "typeorm";
import { CoursesService } from "../courses/courses.service";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    private readonly courseService: CoursesService
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const { course_id } = createGroupDto;
    const course = await this.courseService.findOne(+course_id);
    if (!course) {
      throw new NotFoundException(
        `Course ID-${course_id} not found. Please check ID again`
      );
    }
    const newGroup = await this.groupRepo.save(createGroupDto);
    return {
      message: "New group created successfully!",
      success: true,
      newGroup,
    };
  }

  async findAll() {
    const groups = await this.groupRepo.find({
      relations: ["course"],
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
      relations: ["course"],
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
}
