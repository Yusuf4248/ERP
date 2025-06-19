import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";
import { HomeworkSubmission } from "../../homework-submission/entities/homework-submission.entity";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("homework")
export class Homework {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Homework ID" })
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.homework)
  @ApiProperty({
    type: () => Teacher,
    description: "O'qituvchi obyektiga bog'lanish",
  })
  teacher: Teacher;

  @ManyToOne(() => Group, (group) => group.homework)
  @ApiProperty({ type: () => Group, description: "Guruh obyektiga bog'lanish" })
  group: Group;

  @Column()
  @Field()
  @ApiProperty({
    example: "Uyga vazifa tavsifi",
    description: "Vazifa tavsifi",
  })
  description: string;

  @Column()
  @Field()
  @ApiProperty({
    example: "2025-06-01T18:00:00.000Z",
    description: "Vazifa topshirish muddati",
  })
  deadline: Date;

  @OneToMany(
    () => HomeworkSubmission,
    (homework_submission) => homework_submission.homework
  )
  @Field(() => [HomeworkSubmission], { nullable: true })
  @ApiProperty({
    type: () => [HomeworkSubmission],
    description: "Vazifaga topshirilgan javoblar ro'yxati",
  })
  homework_submission: HomeworkSubmission[];

  
  @CreateDateColumn({ name: "created_at" })
  @Field()
  @ApiProperty({
    example: "2025-06-18T12:00:00.000Z",
    description: "Yaratilgan sana",
  })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  @ApiProperty({
    example: "2025-06-19T12:00:00.000Z",
    description: "Oxirgi yangilanish",
  })
  updated_at: Date;
}
