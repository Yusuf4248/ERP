import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Room } from "../../rooms/entities/room.entity";
import { Admin } from "../../admin/entities/admin.entity";
import { Event } from "../../events/entities/event.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@ObjectType()
@Entity("branches")
export class Branch {
  @ApiProperty({ example: 1, description: "Filial ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Chilonzor Filiali", description: "Filial nomi" })
  @Field()
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    example: "Toshkent sh., Chilonzor 5",
    description: "Filial manzili",
  })
  @Field()
  @Column({ unique: true })
  address: string;

  @ApiProperty({ example: "+998901234567", description: "Qo'ng'iroq raqami" })
  @Field()
  @Column({ unique: true })
  call_number: string;

  @OneToMany(() => Room, (room) => room.branch)
  @Field(() => [Room])
  room: Room[];

  @OneToMany(() => Admin, (admin) => admin.branch)
  @Field(() => [Admin])
  admin: Admin[];

  @OneToMany(() => Event, (event) => event.branch)
  events: Event[];

  @ManyToMany(() => Teacher, (teacher) => teacher.branches)
  teachers: Teacher[];

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
