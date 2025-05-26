import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
@Entity("teacher_groups")
export class TeacherGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, (teacher) => teacher.teacherGroups, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "teacher_id" })
  teacher: Teacher;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.teacherGroups, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "group_id" })
  group: Group;
}
