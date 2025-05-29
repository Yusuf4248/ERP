import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Student } from "../../student/entities/student.entities";

@ObjectType()
@Entity()
export class StudentGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.studentgroup)
  student: Student;

  @ManyToOne(() => Group, (group) => group.studentgroup)
  group: Group;

  @Field()
  @Column()
  period: Date;

  @Field()
  @Column()
  is_active: boolean;
}
