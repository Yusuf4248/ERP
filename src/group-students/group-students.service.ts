import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupStudentDto } from "./dto/create-group-student.dto";
import { UpdateGroupStudentDto } from "./dto/update-group-student.dto";
import { GroupStudent } from "./entities/group-student.entity";
import { Group } from "../group/entities/group.entity";
import { Student } from "../student/entities/student.entities";

@Injectable()
export class GroupStudentsService {
  constructor(
    @InjectRepository(GroupStudent)
    private readonly groupStudentRepository: Repository<GroupStudent>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async create(
    createGroupStudentDto: CreateGroupStudentDto
  ): Promise<GroupStudent> {
    const { groupId, studentId, status = true, period } = createGroupStudentDto;

    // Check if group exists
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    // Check if student exists
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Check if relationship already exists
    const existingRelation = await this.groupStudentRepository.findOne({
      where: {
        group: { id: groupId },
        student: { id: studentId },
      },
    });

    if (existingRelation) {
      throw new BadRequestException(
        "Student is already assigned to this group"
      );
    }

    // Create new group-student relationship
    const groupStudent = this.groupStudentRepository.create({
      group,
      student,
      status,
      period: new Date(period),
    });

    return await this.groupStudentRepository.save(groupStudent);
  }

  async findAll(): Promise<GroupStudent[]> {
    return await this.groupStudentRepository.find({
      relations: ["group", "student"],
      order: { id: "ASC" },
    });
  }

  async findOne(id: number): Promise<GroupStudent> {
    const groupStudent = await this.groupStudentRepository.findOne({
      where: { id },
      relations: ["group", "student"],
    });

    if (!groupStudent) {
      throw new NotFoundException(
        `Group-student relationship with ID ${id} not found`
      );
    }

    return groupStudent;
  }

  async update(
    id: number,
    updateGroupStudentDto: UpdateGroupStudentDto
  ): Promise<GroupStudent> {
    const groupStudent = await this.findOne(id);

    const { groupId, studentId, status, period } = updateGroupStudentDto;

    // If groupId is provided, check if group exists
    if (groupId && groupId !== groupStudent.group.id) {
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }
      groupStudent.group = group;
    }

    // If studentId is provided, check if student exists
    if (studentId && studentId !== groupStudent.student.id) {
      const student = await this.studentRepository.findOne({
        where: { id: studentId },
      });
      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }

      // Check if new relationship already exists
      const existingRelation = await this.groupStudentRepository.findOne({
        where: {
          group: { id: groupId || groupStudent.group.id },
          student: { id: studentId },
        },
      });

      if (existingRelation && existingRelation.id !== id) {
        throw new BadRequestException(
          "Student is already assigned to this group"
        );
      }

      groupStudent.student = student;
    }

    // Update other fields
    if (status !== undefined) {
      groupStudent.status = status;
    }

    if (period) {
      groupStudent.period = new Date(period);
    }

    return await this.groupStudentRepository.save(groupStudent);
  }

  async remove(id: number): Promise<{ message: string }> {
    const groupStudent = await this.findOne(id);

    await this.groupStudentRepository.remove(groupStudent);

    return {
      message: `Group-student relationship with ID ${id} has been deleted successfully`,
    };
  }

  async findByGroup(groupId: number): Promise<GroupStudent[]> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return await this.groupStudentRepository.find({
      where: { group: { id: groupId } },
      relations: ["student"],
      order: { id: "ASC" },
    });
  }

  async findByStudent(studentId: number): Promise<GroupStudent[]> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    return await this.groupStudentRepository.find({
      where: { student: { id: studentId } },
      relations: ["group"],
      order: { id: "ASC" },
    });
  }

  async findActiveStudentsInGroup(groupId: number): Promise<GroupStudent[]> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return await this.groupStudentRepository.find({
      where: {
        group: { id: groupId },
        status: true,
      },
      relations: ["student"],
      order: { id: "ASC" },
    });
  }

  async deactivateStudent(id: number): Promise<GroupStudent> {
    const groupStudent = await this.findOne(id);
    groupStudent.status = false;
    return await this.groupStudentRepository.save(groupStudent);
  }

  async activateStudent(id: number): Promise<GroupStudent> {
    const groupStudent = await this.findOne(id);
    groupStudent.status = true;
    return await this.groupStudentRepository.save(groupStudent);
  }
}
