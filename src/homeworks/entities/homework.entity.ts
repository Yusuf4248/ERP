import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";
import { HomeworkSubmission } from "../../homework-submission/entities/homework-submission.entity";

@ObjectType()
@Entity("homework")
export class Homework {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.homework)
  teacher: Teacher;

  @ManyToOne(() => Group, (group) => group.homework)
  group: Group;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  deadline: Date;

  @Column()
  @Field()
  file_url: string;

  @OneToMany(
    () => HomeworkSubmission,
    (homework_submission) => homework_submission.homework
  )
  homework_submission: HomeworkSubmission[];
}
