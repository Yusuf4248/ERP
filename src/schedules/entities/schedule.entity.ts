import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Attendance } from "../../attendance/entities/attendance.entity";

@ObjectType()
@InputType()
export class Schedule {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  group_id: number;

  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.schedules, { onDelete: "CASCADE" })
  @JoinColumn({ name: "group_id" })
  group: Group;

  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  attendance: Attendance[];
}
