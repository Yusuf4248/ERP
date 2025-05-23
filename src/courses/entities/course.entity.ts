import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("course")
export class Course {
  @ApiProperty({ example: 1, description: "Course ID" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Frontend Bootcamp", description: "Course title" })
  @Field()
  @Column({ type: "varchar", length: 100 })
  title: string;

  @ApiProperty({
    example: "Learn HTML, CSS, JavaScript and React",
    description: "Detailed course description",
  })
  @Field()
  @Column({ type: "text" })
  description: string;

  @ApiProperty({ example: 150000, description: "Price in UZS" })
  @Field()
  @Column()
  price: number;

  @ApiProperty({
    example: "3 months",
    description: "Overall course duration",
  })
  @Field()
  @Column({ type: "varchar", length: 50 })
  duration: string;

  @ApiProperty({
    example: 3,
    description: "Number of lessons in a week",
  })
  @Field()
  @Column({ type: "int" })
  lessons_in_a_week: number;

  @ApiProperty({
    example: "90 minutes",
    description: "Duration of a single lesson",
  })
  @Field()
  @Column({ type: "varchar", length: 50 })
  lesson_duration: string;

  @ApiProperty({
    example: true,
    description: "Is the course currently active?",
  })
  @Field()
  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @ApiProperty({
    example: "2025-05-20T14:55:00.000Z",
    description: "Creation date",
  })
  @Field()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: "2025-05-20T14:55:00.000Z",
    description: "Last updated date",
  })
  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
