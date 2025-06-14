import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Homework } from "../../homeworks/entities/homework.entity";
import { Grade } from "../../grades/entities/grade.entity";
import { Exam } from "../../exams/entities/exam.entity";
import { Group } from "../../group/entities/group.entity";
import { Branch } from "../../branches/entities/branch.entity";

@ObjectType()
@Entity("teacher")
export class Teacher {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali" })
  @Field()
  @Column({ type: "varchar" })
  first_name: string;

  @ApiProperty({ example: "Valiyev" })
  @Field()
  @Column({ type: "varchar" })
  last_name: string;

  @Field()
  @ApiProperty({ example: "ali@example.com" })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ example: "hashed_password" })
  @Field()
  @Column({ type: "varchar" })
  password: string;

  @ApiProperty({ example: "+998901234567" })
  @Field()
  @Column({ type: "varchar", unique: true })
  phone: string;

  @ApiProperty({
    example: "main teacher",
    enum: ["assistant teacher", "main teacher"],
  })
  @Field()
  @Column({ type: "enum", enum: ["assistant teacher", "main teacher"] })
  role: "assistant teacher" | "main teacher";

  @ApiProperty({ example: true })
  @Field()
  @Column({ type: "boolean", default: true, nullable: true })
  is_active: boolean;

  @Field()
  @Column({ type: "varchar", nullable: true })
  refersh_token_hash: string;

  @ApiProperty({
    example: "https://example.com/uploads/avatar.jpg",
    description: "Profil rasmi uchun URL",
  })
  @Column({ nullable: true, default: "" })
  @Field({ nullable: true, defaultValue: "" })
  avatar_url: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Group, (group) => group.teachers, { nullable: true })
  @Field(() => [Group], { nullable: true })
  @JoinTable()
  groups: Group[];

  @OneToMany(() => Homework, (homework) => homework.teacher)
  homework: Homework[];

  @OneToMany(() => Grade, (grades) => grades.teacher)
  grades: Grade[];

  @Field({ nullable: true })
  @ManyToMany(() => Exam, (exam) => exam.teacher, { nullable: true })
  exam: Exam[];

  @Field({ nullable: true })
  @ManyToMany(() => Branch, (branch) => branch.teachers, { nullable: true })
  @JoinTable()
  branches: Branch[];
}
