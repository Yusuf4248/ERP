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
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../../courses/entities/course.entity";
import { TeacherGroup } from "../../teacher-groups/entities/teacher-group.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { StudentGroup } from "../../student-groups/entities/student-group.entity";
import { Homework } from "../../homeworks/entities/homework.entity";
import { Lid } from "../../lid/entities/lid.entity";

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

  @OneToMany(() => TeacherGroup, (tg) => tg.group)
  @Field(() => [TeacherGroup])
  teacherGroups: TeacherGroup[];

  @Field(() => [Schedule], { nullable: true })
  @OneToMany(() => Schedule, (schedule) => schedule.group)
  schedules: Schedule[];

  @OneToMany(() => StudentGroup, (studentgroup) => studentgroup.group)
  studentgroup: StudentGroup[];

  @OneToMany(() => Homework, (homework) => homework.group)
  homework: Homework[];

  @OneToMany(() => Lid, (lid) => lid.group)
  lid: Lid[];
}
