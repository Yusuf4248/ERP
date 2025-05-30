import { ObjectType, Field, ID } from "@nestjs/graphql";
import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { Student } from "../../student/entities/student.entities";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("event_participants")
export class EventParticipant {
  @ApiProperty({ example: 1, description: "Eventning ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: true,
    description: "Ish`tirokchi holati (haqiqiy ishtirok etyaptimi)",
  })
  @Field()
  @Column()
  status: boolean;

  @ApiProperty({
    example: "2025-05-29T12:00:00.000Z",
    description: "Ishtirokchi tadbirga qoshilgan vaqt",
  })
  @Field()
  @CreateDateColumn()
  joined_at: Date;

  @ApiProperty({ type: () => Student, description: "Talaba obyekti" })
  @ManyToOne(() => Student, (student) => student.eventParticipants)
  student: Student;

  @ApiProperty({ type: () => Event, description: "Tadbir obyekti" })
  @ManyToOne(() => Event, (event) => event.participants, {
    onDelete: "CASCADE",
  })
  event: Event;
}
