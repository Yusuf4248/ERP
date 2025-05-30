import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Student } from "../../student/entities/student.entities";

export enum LidStatus {
  YANGI = "yangi",
  TESTDAN_OTDI = "testdan_o'tdi",
  TESTGA_CHAQIRILDI = "testga_chaqirildi",
  QABUL_QILINDI = "qabul_qilindi",
  RAD_ETILDI = "rad_etildi",
}

registerEnumType(LidStatus, {
  name: "LidStatus",
});

@Entity("lid")
@ObjectType()
export class Lid {
  @ApiProperty({ example: 1, description: "Lid ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "O'quvchining ismi" })
  @Column({ type: "varchar", nullable: false })
  @Field()
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "O'quvchining familiyasi" })
  @Column({ type: "varchar", nullable: false })
  @Field()
  last_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "O'quvchining email manzili",
  })
  @Column({ unique: true })
  @Field()
  email: string;

  @ApiProperty({
    example: "hashed_password",
    description: "Parolning xeshlangan ko'rinishi",
  })
  @Column()
  @Field()
  password_hash: string;

  @ApiProperty({
    example: "IELTS",
    description: "O'quvchining maqsadi (targeti)",
  })
  @Column()
  @Field()
  target: string;

  @ApiProperty({
    example: "2025-06-01",
    description: "Test sanasi",
    required: false,
  })
  @Column({ nullable: true })
  @Field({ nullable: true })
  test_date: Date;

  @ApiProperty({
    example: "2025-06-05",
    description: "Test dars (trial lesson) sanasi",
  })
  @Column({ nullable: true })
  @Field({ nullable: true })
  trial_lesson_date: Date;

  @ApiProperty({ description: "Lid qaysi guruhga tegishli" })
  @ManyToOne(() => Group, (group) => group.lid)
  group: Group;

  @ApiProperty({
    enum: LidStatus,
    example: LidStatus.YANGI,
    description: "Lidning hozirgi statusi",
  })
  @Field(() => LidStatus)
  @Column({ type: "enum", enum: LidStatus, default: LidStatus.YANGI })
  lid_status: LidStatus;

  @ApiProperty({
    example: "Telefon orqali bog'lanib bo'lmadi",
    description: "Bekor qilish sababi",
  })
  @Column({ nullable: true })
  @Field({ nullable: true })
  cancel_reason: string;

  @ApiProperty({
    example: "hashed_refresh_token",
    description: "Refresh token hash qiymati",
  })
  @Column({ default: "" })
  @Field()
  refresh_token_hash: string;

  @Field(() => Student)
  @OneToOne(() => Student, (student) => student.lid)
  student: Student;
}
