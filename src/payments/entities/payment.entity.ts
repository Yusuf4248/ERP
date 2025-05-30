import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentType } from "../../payment-types/entities/payment-type.entity";
import { Student } from "../../student/entities/student.entities";

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
  UNCOMFIRMED = "uncomfirmed",
}

registerEnumType(PaymentStatus, {
  name: "PaymentStatus",
  description: "Possible statuses for a status of payment",
});

@ObjectType()
@Entity("payments")
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Tolov ID raqami" })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: 150000, description: "Tolov summasi" })
  amount: number;

  @Field()
  @Column()
  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Tolov sanasi",
  })
  payment_date: Date;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.payments)
  @ApiProperty({ type: () => Group, description: "Tolov bogliq guruh" })
  group: Group;

  @Field(() => PaymentStatus)
  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.UNCOMFIRMED,
  })
  @ApiProperty({
    enum: PaymentStatus,
    description: "Tolov holati (paid, unpaid, uncomfirmed)",
    default: PaymentStatus.UNCOMFIRMED,
  })
  status: PaymentStatus;

  @Field()
  @Column()
  @ApiProperty({ example: "Iyun oyi uchun tolov", description: "Izoh" })
  comment: string;

  @Field(() => PaymentType)
  @ManyToOne(() => PaymentType, (pt) => pt.payments)
  @ApiProperty({ type: () => PaymentType, description: "Tolov turi" })
  paymentType: PaymentType;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.payments)
  @ApiProperty({ type: () => Student, description: "O'quvchi IDsi" })
  student: Student;

  @Field()
  @CreateDateColumn()
  @ApiProperty({
    example: "2025-05-29T14:00:00.000Z",
    description: "Yaratilgan vaqti",
  })
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  @ApiProperty({
    example: "2025-05-29T14:10:00.000Z",
    description: "Yangilangan vaqti",
  })
  updated_at: Date;
}
