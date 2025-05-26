import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../student/entities/student.entities";
import { Schedule } from "../../schedules/entities/schedule.entity";

@ObjectType()
@Entity()
export class Attendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.attendance)
  student: Student;

  @ManyToOne(() => Schedule, (schedule) => schedule.attendance, {
    eager: false,
  })
  schedule: Schedule;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  status: string;
}
