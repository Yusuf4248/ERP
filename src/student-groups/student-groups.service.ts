import { Injectable } from "@nestjs/common";
import { CreateStudentGroupDto } from "./dto/create-student-group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student-group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student-group.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { StudentService } from "../student/student.service";

@Injectable()
export class StudentGroupsService {
  constructor(
    @InjectRepository(StudentGroup)
    private readonly studentGroupRepo: Repository<StudentGroup>,
    private readonly studentService: StudentService,
    private readonly groupService: GroupService
  ) {}
  async create(createStudentGroupDto: CreateStudentGroupDto) {
    const { studentId, groupId, ...otherDto } = createStudentGroupDto;
    const student = await this.studentService.findOne(studentId);
    if (!student) {
      throw new Error("Student Not Found");
    }
    const group = await this.groupService.findOne(groupId);
    if (!group) {
      throw new Error("Group Not Found");
    }
    const studentGroup = this.studentGroupRepo.create({
      student: student.student,
      group: group.group,
      ...otherDto,
    });
    return this.studentGroupRepo.save(studentGroup);
  }

  findAll() {
    return this.studentGroupRepo.find({ relations: ["student", "group"] });
  }

  findOne(id: number) {
    return this.studentGroupRepo.findOne({
      where: { id },
      relations: ["student", "group"],
    });
  }

  update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    return this.studentGroupRepo.preload({ id, ...updateStudentGroupDto });
  }

  remove(id: number) {
    return this.studentGroupRepo.delete({ id });
  }
}
