import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "../../rooms/entities/room.entity";
import { Group } from "../../group/entities/group.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { ExamResult } from "../../exam-results/entities/exam-result.entity";

export enum ExamStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

registerEnumType(ExamStatus, {
  name: "ExamStatus",
  description: "Exam status (pending, completed, cancelled)",
});

@ObjectType()
@Entity()
export class Exam {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Final Exam" })
  @Field()
  @Column()
  title: string;

  @ApiProperty({ example: "This is the final exam for Module 1" })
  @Field()
  @Column()
  description: string;

  @ApiProperty({ example: "2025-06-01" })
  @Field()
  @Column({ type: "date" })
  date: Date;

  @ApiProperty({ enum: ExamStatus, example: ExamStatus.PENDING })
  @Field(() => ExamStatus)
  @Column({ type: "enum", enum: ExamStatus })
  status: ExamStatus;

  @ApiProperty({ example: "14:00", description: "Start time (HH:mm)" })
  @Field()
  @Column({ type: "time" })
  start_time: string;

  @ApiProperty({ example: "15:30", description: "End time (HH:mm)" })
  @Field()
  @Column({ type: "time" })
  end_time: string;

  @ApiProperty({ type: () => Room })
  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.exams)
  room: Room;

  @ApiProperty({ type: () => Group })
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.exams)
  group: Group;

  @ManyToMany(() => Teacher, (teacher) => teacher.exam)
  @JoinTable()
  teacher: Teacher[];

  @Field(() => [ExamResult])
  @OneToMany(() => ExamResult, (exam_result) => exam_result.exam)
  exam_result: ExamResult[];
}
