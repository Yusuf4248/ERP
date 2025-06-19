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
import { Group } from "../../group/entities/group.entity";
import { Attendance } from "../../attendance/entities/attendance.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "../../rooms/entities/room.entity";

@ObjectType()
@Entity()
export class Schedule {
  @ApiProperty({
    example: 1,
    description: "Schedule ID",
  })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Guruhga tegishli bo'lgan jadval",
    type: () => Group,
  })
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.schedules, { onDelete: "CASCADE" })
  group: Group;

  @ApiProperty({
    description: "Attendance ro'yxati",
    type: () => [Attendance],
    isArray: true,
  })
  @OneToMany(() => Attendance, (attendance) => attendance.schedule)
  attendance: Attendance[];

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Boshlanish vaqti (ISO 8601 formatda)",
  })
  @Field()
  @Column()
  start_time: Date;

  @ApiProperty({
    example: "2025-06-03T17:00:00.000Z",
    description: "Tugash vaqti (ISO 8601 formatda)",
  })
  @Field()
  @Column()
  end_time: Date;

  @ApiProperty({
    example: "Monday",
    description: "Haftaning kuni",
  })
  @Field()
  @Column()
  day_of_week: string;

  @ApiProperty({
    description: "Xona (room) ma'lumotlari",
    type: () => Room,
  })
  @ManyToOne(() => Room, (room) => room.schedules)
  room: Room;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
