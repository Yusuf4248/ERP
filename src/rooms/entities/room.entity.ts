import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Branch } from "../../branches/entities/branch.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exam } from "../../exams/entities/exam.entity";

@ObjectType()
@Entity("rooms")
export class Room {
  @ApiProperty({
    example: 1,
    description: "Xonaning ID raqami",
  })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Room A",
    description: "Xonaning nomi",
  })
  @Column()
  @Field()
  name: string;

  @ApiProperty({
    example: 25,
    description: "Xona sig'imi (nechta odam sig'adi)",
  })
  @Column()
  @Field(() => Int)
  capacity: number;

  @ApiProperty({
    type: () => Branch,
    description: "Xonaga tegishli filial (branch)",
  })
  @ManyToOne(() => Branch, (branch) => branch.room)
  @Field(() => Branch)
  branch: Branch;

  @Field(() => [Exam])
  @OneToMany(() => Exam, (exam) => exam.room)
  exams: Exam[];

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
