import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Branch } from "../../branches/entities/branch.entity";
import { Student } from "../../student/entities/student.entities";

@ObjectType()
@Entity("events")
export class Event {
  @ApiProperty({ example: 1, description: "Eventning ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Frontend Bootcamp", description: "Tadbir nomi" })
  @Field()
  @Column()
  name: string;

  @ApiProperty({
    example: "3 kunlik intensiv dasturlash kursi",
    description: "Tadbir tavsifi",
  })
  @Field()
  @Column()
  description: string;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Boshlanish vaqti",
  })
  @Field()
  @Column()
  start_time: Date;

  @ApiProperty({
    example: "2025-06-03T17:00:00.000Z",
    description: "Tugash vaqti",
  })
  @Field()
  @Column()
  end_time: Date;

  @ApiProperty({ example: 50, description: "Maksimal ishtirokchilar soni" })
  @Field()
  @Column()
  max_participants: number;

  @ApiProperty({ example: true, description: "Tadbir faolligi holati" })
  @Field({ defaultValue: true })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    type: () => Branch,
    description: "Tadbir o'tkaziladigan filial",
  })
  @Field(() => Branch)
  @ManyToOne(() => Branch, (branch) => branch.events)
  branch: Branch;

  @Field(() => [Student])
  @ManyToMany(() => Student, (student) => student.events)
  students: Student[];
}
