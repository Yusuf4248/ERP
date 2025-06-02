import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../../courses/entities/course.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { Homework } from "../../homeworks/entities/homework.entity";
import { Lid } from "../../lid/entities/lid.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Exam } from "../../exams/entities/exam.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Student } from "../../student/entities/student.entities";

export enum GroupStatus {
  NEW = "new",
  ACTIVE = "active",
  FULL = "full",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  REACTIVATED = "reactivated",
  PENDING = "pending",
}

registerEnumType(GroupStatus, {
  name: "GroupStatus",
  description: "Possible statuses for a group",
});

@ObjectType()
@Entity("groups")
export class Group {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Beginner Web Development",
    description: "Group name",
  })
  @Field()
  @Column({ type: "varchar", length: 100 })
  name: string;

  @ApiProperty({ example: 2, description: "Related course ID" })
  @Field()
  @Column()
  course_id: number;

  @ApiProperty({ example: "2025-06-01", description: "Group start date" })
  @Field(() => Date)
  @Column({ type: "date" })
  start_date: Date;

  @ApiProperty({ example: "2025-09-01", description: "Group end date" })
  @Field(() => Date)
  @Column({ type: "date" })
  end_date: Date;

  @ApiProperty({ enum: GroupStatus, example: GroupStatus.NEW })
  @Field(() => GroupStatus)
  @Column({
    type: "enum",
    enum: GroupStatus,
    default: GroupStatus.NEW,
  })
  status: GroupStatus;

  @Field()
  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ApiProperty({ type: () => Course })
  @Field(() => Course)
  @ManyToOne(() => Course, (course) => course.groups, { onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @ManyToMany(() => Teacher, (teacher) => teacher.groups)
  @Field(() => [Teacher])
  teachers: Teacher[];

  @Field(() => [Schedule], { nullable: true })
  @OneToMany(() => Schedule, (schedule) => schedule.group)
  schedules: Schedule[];

  @Field(() => [Student], { nullable: true })
  @OneToMany(() => Student, (student) => student.groups)
  students: Student[];

  @Field(() => [Homework], { nullable: true })
  @OneToMany(() => Homework, (homework) => homework.group)
  homework: Homework[];

  @Field(() => [Lid], { nullable: true })
  @OneToMany(() => Lid, (lid) => lid.group)
  lid: Lid[];

  @Field(() => [Payment], { nullable: true })
  @OneToMany(() => Payment, (payments) => payments.group)
  payments: Payment[];

  @Field(() => [Exam])
  @OneToMany(() => Exam, (exam) => exam.group)
  exams: Exam[];
}
