import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("otp")
export class Otp {
  @ApiProperty({
    example: "123456",
    description: "Unikal OTP ID (UUID)",
  })
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: "user@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @Field()
  @Column({ type: "varchar" })
  email: string;

  @ApiProperty({
    example: "493827",
    description: "Yuborilgan bir martalik parol (OTP)",
  })
  @Field()
  @Column({ type: "varchar" })
  otp: string;

  @ApiProperty({
    example: "2025-06-02T12:00:00Z",
    description: "OTP amal qilish muddati (vaqti)",
  })
  @Field()
  @Column({ type: "timestamp" })
  expiration_time: Date;

  @ApiProperty({
    example: false,
    description: "Foydalanuvchi OTP kodni tasdiqlagani yoki yo'qligi",
  })
  @Field()
  @Column({ type: "boolean", default: false })
  verified: boolean;
}
