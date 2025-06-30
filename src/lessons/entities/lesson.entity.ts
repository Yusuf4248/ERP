import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Attendance } from "../../attendance/entities/attendance.entity";
import { Homework } from "../../homeworks/entities/homework.entity";

export enum LessonStatus {
  YANGI = "yangi",
  BEKOR_QILINGAN = "bekor qilingan",
  KECHIKTIRILGAN = "kechiktirilgan",
  YAKUNLANGAN = "yakunlangan",
}

registerEnumType(LessonStatus, {
  name: "LessonStatus",
});

@Entity()
@ObjectType()
export class Lesson {
  @ApiProperty({ example: 1, description: "Lessonning ID raqami" })
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ApiProperty({ example: "Matematika darsi", description: "Dars nomi" })
  @Column()
  @Field()
  title: string;

  @ApiProperty({
    example: "Bu dars algebra haqida bo'ladi",
    description: "Izoh yoki eslatma",
  })
  @Column()
  @Field()
  notes: string;

  @ApiProperty({
    enum: LessonStatus,
    example: LessonStatus.YANGI,
    description: "Darsning holati (status)",
  })
  @Column({
    type: "enum",
    enum: LessonStatus,
    enumName: "lesson_status_enum",
    default: LessonStatus.YANGI,
  })
  @Field(() => LessonStatus)
  status: LessonStatus;

  @ApiProperty({
    type: () => Group,
    nullable: true,
    description: "Dars tegishli bo'lgan guruh",
  })
  @ManyToOne(() => Group, (group) => group.lessons, { nullable: true })
  @Field(() => Group, { nullable: true })
  group: Group;

  @ApiProperty({
    type: () => Schedule,
    nullable: true,
    description: "Dars jadvali",
  })
  @ManyToOne(() => Schedule, (schedule) => schedule.lessons, { nullable: true })
  @Field(() => Schedule, { nullable: true })
  schedule: Schedule;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @Field(() => [Attendance], { nullable: true })
  @OneToMany(() => Attendance, (attendance) => attendance.lesson, {
    nullable: true,
  })
  attendance: Attendance[];

  @Field(() => [Homework])
  @OneToMany(() => Homework, (homework) => homework.lesson)
  homework: Homework[];
}
