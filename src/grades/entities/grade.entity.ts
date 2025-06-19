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
import { HomeworkSubmission } from "../../homework-submission/entities/homework-submission.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@ObjectType()
@Entity("grades")
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Student, (student) => student.grades)
  student: Student;

  @Field()
  @ManyToOne(
    () => HomeworkSubmission,
    (homework_submission) => homework_submission.grades
  )
  homework_submission: HomeworkSubmission;

  @Field()
  @ManyToOne(() => Teacher, (teacher) => teacher.grades)
  teacher: Teacher;

  @Field()
  @Column()
  grade: number;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Field()
  @Column()
  comment: string;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
