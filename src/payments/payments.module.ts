import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Group } from "../group/entities/group.entity";
import { PaymentType } from "../payment-types/entities/payment-type.entity";
import { PaymentTypesModule } from "../payment-types/payment-types.module";
import { GroupModule } from "../group/group.module";
import { Student } from "../student/entities/student.entities";
import { StudentModule } from "../student/student.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Group, PaymentType, Student]),
    PaymentTypesModule,
    GroupModule,
    StudentModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
