import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branch } from "../../branches/entities/branch.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Schedule } from "../../schedules/entities/schedule.entity";

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

  @Field(() => [Schedule])
  @OneToMany(() => Schedule, (schedules) => schedules.room)
  schedules: Schedule[];
}
