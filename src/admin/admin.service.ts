import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import { BranchesService } from "../branches/branches.service";
import { UpdateAdminStatusDto } from "./dto/update-admin-status.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly branchService: BranchesService
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const hashshed_password = await bcrypt.hash(
      createAdminDto.password_hash,
      7
    );
    const branch = await this.branchService.findOne(createAdminDto.branchId);
    const newAdmin = await this.adminRepo.save({
      ...createAdminDto,
      branch: branch.branch,
      password_hash: hashshed_password,
    });
    return {
      Message: "New Admin Created",
      success: true,
      newAdmin,
    };
  }

  async findAll() {
    const admins = await this.adminRepo.find({ relations: ["branch"] });
    if (admins.length == 0) {
      throw new BadRequestException("Admins not found");
    }
    return {
      success: true,
      admins,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new BadRequestException(`Admin with id-${id} not found`);
    }
    return {
      message: `Admin-${id}`,
      success: true,
      admin,
    };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.adminRepo.update({ id }, updateAdminDto);

    const admin = await this.adminRepo.findOneBy({ id });
    return {
      message: "Admin data updated",
      success: true,
      admin,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0)
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    await this.findOne(id);
    await this.adminRepo.delete({ id });

    return {
      message: `${id}-admin deleted`,
      success: true,
    };
  }

  async findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { old_password, password, confirm_password } = changePasswordDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException("admin not found");
    }
    const oldValidPassword = await bcrypt.compare(
      old_password,
      admin.password_hash
    );
    if (!oldValidPassword) {
      throw new BadRequestException("Old password is incorrect");
    }

    admin.password_hash = await bcrypt.hash(password, 7);
    await this.adminRepo.save(admin);

    return { message: "Password successfully changed", new_pass: password };
  }

  async updateTokenHash(id: number, hash: string) {
    await this.adminRepo.update(id, { refersh_token_hash: hash });
  }

  async updateStatus(id: number, dto: UpdateAdminStatusDto) {
    const old_data = await this.findOne(id);

    if (!("is_creator" in dto) && !("is_active" in dto)) {
      throw new BadRequestException(
        "Hech qanday o'zgaruvchan maydon yuborilmadi (is_creator yoki is_active)"
      );
    }

    await this.adminRepo.update({ id }, dto);

    const new_data = await this.findOne(id);

    return {
      message: "Admin holati muvaffaqiyatli yangilandi",
      old_data,
      new_data,
    };
  }
}
