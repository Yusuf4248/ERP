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
import { Homework } from "../../homeworks/entities/homework.entity";
import { Student } from "../../student/entities/student.entities";
import { Grade } from "../../grades/entities/grade.entity";

export enum HomeworkStatus {
  QABUL_QILINGAN = "qabul qilingan",
  QAYTARILGAN = "qaytarilgan",
  BAJARILMAGAN = "bajarilmagan",
  KUTAYOTGAN = "kutayotgan",
}

registerEnumType(HomeworkStatus, {
  name: "HomeworkStatus",
});

@ObjectType()
@Entity("homework-submission")
export class HomeworkSubmission {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Homework)
  @ManyToOne(() => Homework, (homework) => homework.homework_submission)
  homework: Homework;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.homework_submission)
  student: Student;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  submitted_at: Date;

  @Field()
  @Column()
  comment: string;

  @Field(() => HomeworkStatus)
  @Column({
    type: "enum",
    enum: HomeworkStatus,
    enumName: "homework_status_enum",
    default: HomeworkStatus.BAJARILMAGAN,
  })
  status: HomeworkStatus;

  @Field(() => Grade)
  @OneToMany(() => Grade, (grades) => grades.homework_submission)
  grades: Grade[];

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
