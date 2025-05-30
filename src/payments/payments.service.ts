import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { PaymentTypesService } from "../payment-types/payment-types.service";
import { GroupService } from "../group/group.service";
import { StudentService } from "../student/student.service";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly paymentTypeService: PaymentTypesService,
    private readonly groupService: GroupService,
    private readonly studentService: StudentService
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const { group } = await this.groupService.findOne(createPaymentDto.groupId);
    const { paymentType } = await this.paymentTypeService.findOne(
      createPaymentDto.paymentTypeId
    );
    const { student } = await this.studentService.findOne(
      createPaymentDto.studentId
    );
    const newPayment = await this.paymentRepo.save({
      ...createPaymentDto,
      group,
      paymentType,
      student,
    });
    return {
      message: "New student payment added",
      success: true,
      newPayment,
    };
  }

  async findAll() {
    const payments = await this.paymentRepo.find({
      relations: ["student", "group", "paymentType"],
    });
    if (payments.length == 0) {
      throw new NotFoundException("Payment not found");
    }
    return {
      message: "All payments",
      success: true,
      payments,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ["student", "group", "paymentType"],
    });
    if (!payment) {
      throw new NotFoundException(`${id}-payment not found`);
    }
    return {
      message: `${id}-payment data`,
      succes: true,
      payment,
    };
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.paymentRepo.update({ id }, updatePaymentDto);

    const { payment } = await this.findOne(id);
    return {
      message: `${id}-payment data updated`,
      success: true,
      payment,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.paymentRepo.delete(id);

    return {
      message: `${id}-payment deleted`,
      success: true,
    };
  }
}
