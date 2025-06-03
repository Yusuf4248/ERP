import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Attendance } from "../../attendance/entities/attendance.entity";
import { HomeworkSubmission } from "../../homework-submission/entities/homework-submission.entity";
import { Grade } from "../../grades/entities/grade.entity";
import { Lid } from "../../lid/entities/lid.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Event } from "../../events/entities/event.entity";
import { Group } from "../../group/entities/group.entity";
import { ExamResult } from "../../exam-results/entities/exam-result.entity";

@ObjectType()
@Entity("student")
export class Student {
  @ApiProperty({
    example: 1,
    description: "O'quvchining unikal identifikatori",
  })
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ApiProperty({
    example: "Ali",
    description: "O'quvchining ismi",
  })
  @Column({ type: "varchar" })
  @Field()
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "O'quvchining familiyasi",
  })
  @Column({ type: "varchar" })
  @Field()
  last_name: string;

  @ApiProperty({
    example: "ali.valiyev@gmail.com",
    description: "Email manzili (yagona bo'lishi kerak)",
  })
  @Column({ type: "varchar", unique: true })
  @Field()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami (yagona bo'lishi kerak)",
  })
  @Column({ type: "varchar", unique: true })
  @Field()
  phone: string;

  @ApiProperty({
    example: "$2b$10$hashedValueHere",
    description: "Parolning hashlangan ko'rinishi",
  })
  @Column({ type: "varchar" })
  @Field()
  password_hash: string;

  @ApiProperty({
    example: true,
    description: "Holati: faol yoki nofaol",
  })
  @Column({ default: true })
  @Field()
  is_active: boolean;

  @ApiProperty({
    example: "male",
    description: "Jinsi: faqat 'male' yoki 'female'",
  })
  @Column({
    type: "enum",
    enum: ["male", "female"],
  })
  @Field()
  gender: "male" | "female";

  @ApiProperty({
    example: "2005-06-15",
    description: "Tug'ilgan sana (YYYY-MM-DD)",
  })
  @Column({ type: "date" })
  @Field()
  date_of_birth: Date;

  @ApiProperty({
    example: "https://example.com/uploads/avatar.jpg",
    description: "Profil rasmi uchun URL",
  })
  @Column({ nullable: true })
  @Field()
  avatar_url: string;

  @Column({ type: "varchar", nullable: true })
  @Field()
  refersh_token_hash: string;

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[];

  @ManyToMany(() => Group, (group) => group.students, { nullable: true })
  groups: Group[];

  @OneToMany(
    () => HomeworkSubmission,
    (homework_submission) => homework_submission.student
  )
  homework_submission: HomeworkSubmission[];

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grades) => grades.student)
  grades: Grade[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  lidId: number;

  @Field(() => [Event])
  @ManyToMany(() => Event, (event) => event.students, { nullable: true })
  events: Event[];

  @Field(() => [Payment])
  @OneToMany(() => Payment, (payments) => payments.student)
  payments: Payment;

  @Field(() => [ExamResult])
  @OneToMany(() => ExamResult, (exam_result) => exam_result.student)
  exam_result: ExamResult[];
}
