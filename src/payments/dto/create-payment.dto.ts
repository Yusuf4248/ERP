import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
} from "class-validator";
import { InputType, Field, Int } from "@nestjs/graphql";
import { PaymentStatus } from "../entities/payment.entity";

@InputType()
export class CreatePaymentDto {
  @ApiProperty({ example: 150000 })
  @IsNumber()
  @Field(() => Int)
  amount: number;

  @ApiProperty({ example: "2025-06-01T09:00:00.000Z" })
  @IsDateString()
  @Field()
  payment_date: Date;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Field(() => Int)
  groupId: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Field(() => Int)
  studentId: number;

  @ApiProperty({ example: PaymentStatus.UNCOMFIRMED, enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  @Field(() => PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiProperty({ example: "Iyun oyi uchun to'lov" })
  @IsString()
  @Field()
  comment: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Field(() => Int)
  paymentTypeId: number;
}
