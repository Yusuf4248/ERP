import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entities";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { LidService } from "../lid/lid.service";
import { Event } from "../events/entities/event.entity";
import { FileService } from "../file/file.service";
import { Group } from "../group/entities/group.entity";
import * as path from "path";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
    private readonly lidService: LidService,
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
    const students = await this.studentRepo.find();
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

  // async uploadAvatar(studentId: number, file: any) {
  //   try {
  //     const { student } = await this.findOne(studentId);

  //     const fileName = await this.fileService.saveFile(file);

  //     student.avatar_url = fileName;
  //     const updated = await this.studentRepo.save(student);

  //     return {
  //       message: "Avatar muvaffaqiyatli yuklandi",
  //       data: updated,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException(
  //       "Avatar yuklashda xatolik yuz berdi"
  //     );
  //   }
  // }

  async uploadAvatar(studentId: number, file: Express.Multer.File) {
    try {
      const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
        ".svg",
        ".mp4",
        ".mov",
        ".mkv",
        ".webm",
      ];

      const ext = path.extname(file.originalname).toLowerCase();

      if (!allowedExtensions.includes(ext)) {
        throw new BadRequestException(`Fayl turi ruxsat etilmagan: ${ext}`);
      }

      const { student } = await this.findOne(studentId);

      const fileName = await this.fileService.saveFile(file);

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
}
