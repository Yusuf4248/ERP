import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { In, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as path from "path";
import * as fs from "fs";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import { Exam } from "../exams/entities/exam.entity";
import { Group } from "../group/entities/group.entity";
import { Branch } from "../branches/entities/branch.entity";
import { FileService } from "../file/file.service";
import { Response } from "express";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(Group)
    private readonly branchRepo: Repository<Branch>,
    private readonly fileService: FileService
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const { branchId } = createTeacherDto;
    let branches: Branch[] = [];
    const hashshed_password = await bcrypt.hash(createTeacherDto.password, 7);

    if (Array.isArray(branchId) && branchId.length > 0) {
      branches = await this.branchRepo.find({
        where: { id: In(branchId) },
      });
    }
    const newTeacher = await this.teacherRepo.save({
      ...createTeacherDto,
      password: hashshed_password,
      branches,
    });
    return {
      message: "Teacher created successfully",
      success: true,
      newTeacher,
    };
  }

  async findAll() {
    const teachers = await this.teacherRepo.find({
      relations: ["exam", "groups", "branches"],
    });
    if (!teachers) {
      throw new BadRequestException("Teacher not found");
    }
    return {
      success: true,
      teachers,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const teacher = await this.teacherRepo.findOne({
      where: { id },
      relations: ["exam", "groups", "branches"],
    });
    if (!teacher) {
      throw new BadRequestException(`teacher with ${id}-id not found`);
    }
    return {
      message: `${id}-teacher`,
      success: true,
      teacher,
    };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.findOne(id);
    await this.teacherRepo.update({ id }, updateTeacherDto);

    const teacher = await this.findOne(id);
    return {
      message: "Teacher data updated",
      success: true,
      teacher,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.teacherRepo.delete(id);

    return {
      message: `${id}-teacher deleted`,
      success: true,
    };
  }

  findByEmail(email: string) {
    return this.teacherRepo.findOneBy({ email });
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { old_password, password, confirm_password } = changePasswordDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const teacher = await this.teacherRepo.findOneBy({ id });
    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }
    const oldValidPassword = await bcrypt.compare(
      old_password,
      teacher.password
    );
    if (!oldValidPassword) {
      throw new BadRequestException("Old password is incorrect");
    }

    teacher.password = await bcrypt.hash(password, 7);
    await this.teacherRepo.save(teacher);

    return {
      message: "Password successfully changed",
      success: true,
      new_pass: password,
    };
  }

  async updateTokenHash(id: number, hash: string) {
    await this.teacherRepo.update(id, { refersh_token_hash: hash });
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    try {
      const teacher = this.findOne(id);

      const file_path = path.resolve(
        __dirname,
        "..",
        "..",
        "static",
        "teacher"
      );
      const fileName = await this.fileService.saveFile(file, file_path);

      (await teacher).teacher.avatar_url = fileName;
      const updated = await this.teacherRepo.save((await teacher).teacher);

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
    const { teacher } = await this.findOne(id);
    if (!teacher || !teacher.avatar_url) {
      throw new BadRequestException("Avatar topilmadi");
    }

    const avatarPath = path.join(
      __dirname,
      "..",
      "..",
      "static",
      "teacher",
      teacher.avatar_url
    );

    if (!fs.existsSync(avatarPath)) {
      throw new BadRequestException("Fayl mavjud emas");
    }

    res.sendFile(avatarPath);
  }
}
