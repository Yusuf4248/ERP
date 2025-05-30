import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../student/entities/student.entities";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class Attendance {
  @ApiProperty({ example: 1, description: 'Unikal ID raqami' })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Student, description: "Talaba obyekti" })
  @ManyToOne(() => Student, (student) => student.attendance)
  student: Student;

  @ApiProperty({ type: () => Schedule, description: "Dars jadvali obyekti" })
  @ManyToOne(() => Schedule, (schedule) => schedule.attendance, {
    eager: false,
  })
  schedule: Schedule;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Davomat sanasi",
  })
  @Field()
  @Column()
  date: Date;

  @ApiProperty({
    example: "bor",
    description: "Talabaning holati (masalan: bor, yo'q, kechikkan)",
  })
  @Field()
  @Column()
  status: string;
}
