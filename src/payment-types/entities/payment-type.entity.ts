import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Payment } from "../../payments/entities/payment.entity";

@ObjectType()
@Entity("payment_types")
export class PaymentType {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "To'lov turi ID raqami" })
  id: number;

  @Field()
  @Column({ unique: true })
  @ApiProperty({ example: "Naqd", description: "To'lov turi nomi" })
  name: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  @ApiProperty({ example: "Naqd pul bilan to'lov", required: false })
  description?: string;

  @Field()
  @Column({ default: true })
  @ApiProperty({ example: true, description: "Faollik holati" })
  is_active: boolean;

  @Field(() => [Payment])
  @OneToMany(() => Payment, (payments) => payments.paymentType)
  payments: Payment[];

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
