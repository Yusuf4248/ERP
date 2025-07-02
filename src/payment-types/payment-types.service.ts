import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePaymentTypeDto } from "./dto/create-payment-type.dto";
import { UpdatePaymentTypeDto } from "./dto/update-payment-type.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentType } from "./entities/payment-type.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentTypesService {
  constructor(
    @InjectRepository(PaymentType)
    private readonly paymentTypeRepo: Repository<PaymentType>
  ) {}
  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    const newPaymentStatus =
      await this.paymentTypeRepo.save(createPaymentTypeDto);
    return {
      message: "New payment type create!",
      success: true,
      newPaymentStatus,
    };
  }

  async findAll() {
    const paymetnTypes = await this.paymentTypeRepo.find();
    return {
      message: "All payment types",
      success: true,
      paymetnTypes,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const paymentType = await this.paymentTypeRepo.findOneBy({ id });
    if (!paymentType) {
      throw new NotFoundException(`${id} - payment type not found`);
    }
    return {
      message: `${id}- payment type`,
      success: true,
      paymentType,
    };
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    await this.findOne(id);
    await this.paymentTypeRepo.update({ id }, updatePaymentTypeDto);

    const { paymentType } = await this.findOne(id);

    return {
      message: `${id}- payment type data updated!`,
      success: true,
      paymentType,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.paymentTypeRepo.delete(id);

    return {
      message: `${id}- payment type deleted!`,
      success: true,
    };
  }
}
