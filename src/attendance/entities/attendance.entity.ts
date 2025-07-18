import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "../../student/entities/student.entities";
import { ApiProperty } from "@nestjs/swagger";
import { Lesson } from "../../lessons/entities/lesson.entity";

export enum AttendanceStatus {
  CAME = "came",
  DID_NOT_CAME = "did not came",
}

@ObjectType()
@Entity()
export class Attendance {
  @ApiProperty({ example: 1, description: "Unikal ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Student, description: "Talaba obyekti" })
  @ManyToOne(() => Student, (student) => student.attendance)
  student: Student;

  @ApiProperty({ type: () => Lesson, description: "Dars jadvali obyekti" })
  @ManyToOne(() => Lesson, (lesson) => lesson.attendance, {
    eager: false,
  })
  lesson: Lesson;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Davomat sanasi",
  })
  @Field()
  @Column()
  date: Date;

  @ApiProperty({
    enum: AttendanceStatus,
    example: AttendanceStatus.CAME,
    description: "Talabaning holati (masalan: bor, yo'q, kechikkan)",
  })
  @Field()
  @Column({
    type: "enum",
    enum: AttendanceStatus,
  })
  status: AttendanceStatus;

  @ApiProperty({
    example: "Darsga ma'lum sababga ko'ra kech qoldi.",
    description: "O'quvchining dars kelgan yoki kelmaganligi haqida tavsif",
  })
  @Column()
  description: string;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
