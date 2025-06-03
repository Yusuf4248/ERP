import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateLidDto } from "./dto/create-lid.dto";
import { UpdateLidDto } from "./dto/update-lid.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Lid, LidStatus } from "./entities/lid.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as otpGenerator from "otp-generator";
import * as uuid from "uuid";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import { AddMinutesToDate } from "../common/helpers/add-minute";
import { Otp } from "./entities/otp.entity";
import { MailService } from "../mail/mail.service";
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Injectable()
export class LidService {
  constructor(
    @InjectRepository(Lid) private readonly lidRepo: Repository<Lid>,
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
    private readonly mailService: MailService
  ) {}
  async create(createLidDto: CreateLidDto) {
    const { confirm_password, password, email } = createLidDto;
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
    try {
      const res = await this.generateNewOtp(email);
      return {
        res,
        newLid,
      };
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga otp yuborishda xatolik");
    }
  }

  async findAll() {
    const lid = await this.lidRepo.find();
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

  async generateNewOtp(email: string) {
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 3);

    await this.otpRepo.delete({ email });

    const newOtp = await this.otpRepo.save({
      id: uuid.v4(),
      otp,
      email,
      expiration_time,
    });

    await this.mailService.sendOtpMail(email, otp);

    const details = {
      timestamp: now,
      email,
      otp_id: newOtp.id,
    };

    const verification_key = await encode(JSON.stringify(details));

    return {
      message: "Otp emailga yuborildi",
      verification_key,
      otp_id: newOtp.id,
    };
  }

  async verifyOtp(otp_id: string, verifyOtpDto: VerifyOtpDto) {
    let otp_details;
    const currentDate = new Date();
    if (verifyOtpDto.verification_key) {
      const decodedData = await decode(verifyOtpDto.verification_key);
      otp_details = JSON.parse(decodedData);
    } else {
      otp_details = await this.otpRepo.findOne({ where: { id: otp_id } });
    }
    if (otp_details.email !== verifyOtpDto.email) {
      throw new BadRequestException("Otp bu emailga yuborilmagan");
    }
    const otp = await this.otpRepo.findOne({ where: { id: otp_id } });
    if (otp == null) {
      throw new NotFoundException("Bunday otp yo'q");
    }
    if (otp.verified) {
      throw new BadRequestException("Bu otp avval tekshirilgan");
    }
    if (otp.expiration_time < currentDate) {
      throw new BadRequestException("Bu otpni vaqti tugagan");
    }
    if (otp.otp !== verifyOtpDto.otp) {
      throw new BadRequestException("Otp mos emas");
    }

    const user = await this.lidRepo.update(
      { email: otp.email },
      { is_active: true }
    );

    await this.otpRepo.update({ id: otp.id }, { verified: true });

    return {
      message: "Tabriklayman, siz aktivatsiyadan o'tdingiz",
    };
  }
}
