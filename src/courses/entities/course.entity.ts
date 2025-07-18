import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Group } from "../../group/entities/group.entity";

export enum LessonInAWeekEnum {
  THREE = 3,
  FIVE = 5,
}

export enum LessonDurationEnum {
  MINUTES_120 = 120,
  MINUTES_180 = 180,
  MINUTES_240 = 240,
  MINUTES_270 = 270,
}

@Entity("course")
export class Course {
  @ApiProperty({ example: 1, description: "Course ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Frontend Bootcamp", description: "Course title" })
  @Column({ type: "varchar", length: 100 })
  title: string;

  @ApiProperty({
    example: "Learn HTML, CSS, JavaScript and React",
    description: "Detailed course description",
  })
  @Column()
  description: string;

  @ApiProperty({ example: 150000, description: "Price in UZS" })
  @Column()
  price: number;

  @ApiProperty({
    example: "3",
    description: "Overall course duration(in month)",
  })
  @Column()
  duration: number;

  @ApiProperty({
    enum: LessonInAWeekEnum,
    example: LessonInAWeekEnum.FIVE,
    description: "Number of lessons in a week(2,3,4,5)",
  })
  @Column({ type: "enum", enum: LessonInAWeekEnum })
  lessons_in_a_week: LessonInAWeekEnum;

  @ApiProperty({
    enum: LessonDurationEnum,
    example: LessonDurationEnum.MINUTES_240,
    description: "Duration of a single lesson(120, 180, 240, 270 minutes)",
  })
  @Column({ type: "enum", enum: LessonDurationEnum })
  lesson_duration: LessonDurationEnum;

  @ApiProperty({
    example: true,
    description: "Is the course currently active?",
  })
  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @ApiProperty({
    example: "2025-05-20T14:55:00.000Z",
    description: "Creation date",
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: "2025-05-20T14:55:00.000Z",
    description: "Last updated date",
  })
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    type: () => [Group],
  })
  @OneToMany(() => Group, (group) => group.course)
  groups: Group[];
}
