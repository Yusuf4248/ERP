import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entities";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { LidService } from "../lid/lid.service";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly lidService: LidService
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { password_hash, confirm_password, lidId } = createStudentDto;
    if (password_hash !== confirm_password) {
      throw new BadRequestException(
        "Password and confirmation password are not the same"
      );
    }
    const hashshed_password = await bcrypt.hash(password_hash, 7);
    const { lid } = await this.lidService.findOne(+lidId!);
    const newStudent = await this.studentRepo.save({
      ...createStudentDto,
      password_hash: hashshed_password,
      lid,
    });
    return {
      message: "Student successfully created!",
      success: true,
      newStudent,
    };
  }

  async findAll() {
    const students = await this.studentRepo.find({ relations: ["lid"] });
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
      relations: ["lid"],
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

    const { lidId } = updateStudentDto;
    if (lidId) {
      const { lid } = await this.lidService.findOne(+lidId!);
      await this.studentRepo.update({ id }, { lid });
    }
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
}
