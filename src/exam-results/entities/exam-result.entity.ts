import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "../../exams/entities/exam.entity";
import { Student } from "../../student/entities/student.entities";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("exam-results")
export class ExamResult {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 87 })
  @Field()
  @Column()
  score: number;

  @ApiProperty({ example: 100 })
  @Field()
  @Column()
  max_score: number;

  @ApiProperty({ example: "2025-05-31T00:00:00.000Z" })
  @Field()
  @Column()
  date: Date;

  @ApiProperty({ type: () => Exam })
  @Field(() => Exam)
  @ManyToOne(() => Exam, (exam) => exam.exam_result)
  exam: Exam;

  @ApiProperty({ type: () => Student })
  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.exam_result)
  student: Student;
}
