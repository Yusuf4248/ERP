import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLidDto } from "./dto/create-lid.dto";
import { UpdateLidDto } from "./dto/update-lid.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Lid, LidStatus } from "./entities/lid.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import * as bcrypt from "bcrypt";
import { ChangePasswordDto } from "../student/dto/change-password.dto";

@Injectable()
export class LidService {
  constructor(
    @InjectRepository(Lid) private readonly lidRepo: Repository<Lid>,
    private readonly groupService: GroupService
  ) {}
  async create(createLidDto: CreateLidDto) {
    const { confirm_password, password } = createLidDto;
    if (password !== confirm_password) {
      throw new BadRequestException(
        "Password and confirm_password do not match"
      );
    }
    const hashshed_password = await bcrypt.hash(password, 7);
    const newLid = await this.lidRepo.save({
      ...createLidDto,
      password_hash: hashshed_password,
    });
    return {
      message: "New lid created",
      success: true,
      newLid,
    };
  }

  async findAll() {
    const lid = await this.lidRepo.find({ relations: ["group"] });
    if (lid.length == 0) {
      throw new NotFoundException("Lids not found");
    }
    return {
      message: "Al lids",
      success: true,
      lid,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const lid = await this.lidRepo.findOne({
      where: { id },
      relations: ["group"],
    });
    if (!lid) {
      throw new NotFoundException(`${id}-lid not found`);
    }
    return {
      message: `${id}-lid data`,
      success: true,
      lid,
    };
  }

  async update(id: number, updateLidDto: UpdateLidDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.lidRepo.update({ id }, updateLidDto);

    const lid = await this.findOne(id);
    return {
      message: `${id}-lid data updated`,
      success: true,
      lid,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.lidRepo.delete(id);

    return {
      message: `${id}-lid deleted`,
      success: true,
    };
  }

  async findByEmail(email: string) {
    return this.lidRepo.findOneBy({ email });
  }

  async updateTokenHash(id: number, hash: string) {
    await this.lidRepo.update(id, { refresh_token_hash: hash });
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const { old_password, password, confirm_password } = changePasswordDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match");
    }
    const lid = await this.findOne(id);
    const oldValidPassword = await bcrypt.compare(
      old_password,
      lid.lid.password_hash
    );
    if (!oldValidPassword) {
      throw new BadRequestException("Old password is incorrect");
    }

    lid.lid.password_hash = await bcrypt.hash(password, 7);
    await this.lidRepo.save(lid.lid);

    return { message: "Password successfully changed", new_pass: password };
  }
  async findByStatus(status: LidStatus) {
    const lids = await this.lidRepo.find({ where: { lid_status: status } });
    return {
      count: lids.length,
      data: lids,
    };
  }
}
