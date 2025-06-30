import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { Event } from "../events/entities/event.entity";
import { FileService } from "../file/file.service";
import { Group } from "../group/entities/group.entity";
import { Response } from "express";
import { Homework } from "../homeworks/entities/homework.entity";
import * as path from "path";
import * as fs from "fs";
import * as bcrypt from "bcrypt";
import { Media } from "../media/entities/media.entity";
import {
  HomeworkStatus,
  HomeworkSubmission,
} from "../homework-submission/entities/homework-submission.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>,
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
    @InjectRepository(HomeworkSubmission)
    private readonly homeworkSubmissionRepo: Repository<HomeworkSubmission>,
    private readonly fileService: FileService
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { password_hash, confirm_password, groupsId, eventsId } =
      createStudentDto;

    if (password_hash !== confirm_password) {
      throw new BadRequestException(
        "Password and confirmation password are not the same"
      );
    }

    const hashed_password = await bcrypt.hash(password_hash, 7);

    let events: Event[] = [];
    let groups: Group[] = [];

    if (Array.isArray(eventsId) && eventsId.length > 0) {
      events = await this.eventRepo.find({
        where: { id: In(eventsId) },
      });
    }

    if (Array.isArray(groupsId) && groupsId.length > 0) {
      groups = await this.groupRepo.find({
        where: { id: In(groupsId) },
      });
    }

    const newStudent = await this.studentRepo.save({
      ...createStudentDto,
      password_hash: hashed_password,
      events,
      groups,
    });

    return {
      message: "Student successfully created!",
      success: true,
      newStudent,
    };
  }

  async findAll() {
    const students = await this.studentRepo.find({
      relations: ["events", "groups"],
    });
    if (students.length == 0)
      throw new BadRequestException("Students not found");
    return {
      success: true,
      students,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ["events", "groups", "groups.course"],
    });
    if (!student) {
      throw new BadRequestException(`student with ${id}-id not fount`);
    }
    return {
      message: `${id}-student`,
      success: true,
      student,
    };
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.studentRepo.update({ id }, updateStudentDto);

    const student = await this.findOne(id);
    return {
      message: "Student data updated",
      success: true,
      student,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.studentRepo.delete({ id });
    return {
      message: `${id}-id student deleted`,
      success: true,
    };
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { old_password, password, confirm_password } = changePasswordDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    const oldValidPassword = await bcrypt.compare(
      old_password,
      student.password_hash
    );
    if (!oldValidPassword) {
      throw new BadRequestException("Old password is incorrect");
    }

    student.password_hash = await bcrypt.hash(password, 7);
    await this.studentRepo.save(student);

    return { message: "Password successfully changed", new_pass: password };
  }

  async findByEmail(email: string) {
    return this.studentRepo.findOneBy({ email });
  }

  async updateTokenHash(id: number, hash: string) {
    await this.studentRepo.update(id, { refersh_token_hash: hash });
  }

  async uploadAvatar(studentId: number, file: Express.Multer.File) {
    try {
      const { student } = await this.findOne(studentId);

      const file_path = path.resolve(
        __dirname,
        "..",
        "..",
        "static",
        "student"
      );

      const fileName = await this.fileService.saveFile(file, file_path);

      student.avatar_url = fileName;
      const updated = await this.studentRepo.save(student);

      return {
        message: "Avatar muvaffaqiyatli yuklandi",
        data: updated.avatar_url,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        "Avatar yuklashda xatolik yuz berdi"
      );
    }
  }

  async viewAvatar(id: number, res: Response) {
    const { student } = await this.findOne(id);
    if (!student || !student.avatar_url) {
      return res.status(404).json({ message: "Avatar topilmadi" });
    }

    const avatarPath = path.join(
      __dirname,
      "..",
      "..",
      "static",
      "student",
      student.avatar_url
    );

    if (!fs.existsSync(avatarPath)) {
      return res.status(404).json({ message: "Fayl mavjud emas" });
    }

    res.sendFile(avatarPath);
  }

  async findStudentAllGroups(id: number) {
    const { student } = await this.findOne(id);
    if (student.groups.length == 0) {
      throw new NotFoundException("The student has no group.");
    }
    const groups = student.groups.map((group) => ({
      name: group.name,
      course: group.course.title,
      start_date: group.start_date,
      end_date: group.end_date,
      status: group.status,
    }));
    return {
      groups,
    };
  }

  async getStudentHomeworksByGroup(
    studentId: number,
    groupId: number,
    page: number,
    limit: number,
    status: HomeworkStatus
  ) {
    if (!Number.isInteger(Number(groupId)) || Number(groupId) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const group = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ["students"],
    });
    if (!group) {
      throw new NotFoundException(`${groupId}-group not found`);
    }
    const isStudentExist = group.students.some(
      (student) => student.id == studentId
    );

    if (!isStudentExist) {
      throw new ForbiddenException(
        `${studentId}-student not found in this group`
      );
    }
    if (page <= 0 || limit <= 0)
      throw new BadRequestException("Page and limit must be greater than zero");
    const skip = (page - 1) * limit;

    if (!status) {
      const [homeworks, total] = await this.homeworkRepo.findAndCount({
        relations: ["teacher", "group"],
        skip,
        take: limit,
        order: { id: "DESC" },
      });
      if (homeworks.length == 0) {
        throw new NotFoundException("Homework not found");
      }

      return {
        success: true,
        total,
        page,
        limit,
        homeworks,
      };
    } else {
      const [homeworks, total] = await this.homeworkSubmissionRepo.findAndCount(
        {
          where: {
            student: { id: studentId },
            homework: { group: { id: groupId } },
            status: status,
          },
          relations: ["homework", "homework.group", "homework.teacher"],
          skip,
          take: limit,
          order: { id: "DESC" },
        }
      );

      if (homeworks.length == 0) {
        throw new NotFoundException("Homework not found");
      }

      return {
        success: true,
        total,
        page,
        limit,
        status,
        homeworks,
      };
    }
  }
}
