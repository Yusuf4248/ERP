import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Branch } from "../../branches/entities/branch.entity";

@ObjectType()
@Entity("admin")
export class Admin {
  @ApiProperty({ example: 1, description: "Adminning unikal identifikatori" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Adminning ismi" })
  @Field()
  @Column({ type: "varchar" })
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Adminning familiyasi" })
  @Field()
  @Column({ type: "varchar" })
  last_name: string;

  @ApiProperty({
    example: "ali.valiyev@gmail.com",
    description: "Email manzili (yagona bo'lishi kerak)",
  })
  @Field()
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami (yagona bo'lishi kerak)",
  })
  @Field()
  @Column({ type: "varchar", unique: true })
  phone: string;

  @ApiProperty({
    example: "$2b$10$hashedValueHere",
    description: "Parolning hashlangan ko'rinishi",
  })
  @Field()
  @Column({ type: "varchar" })
  password_hash: string;

  @ApiProperty({
    example: false,
    description: "Administrator yaratuvchi bo'lib hisoblanadimi",
  })
  @Field()
  @Column({ type: "boolean", default: false, nullable: true })
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Administrator faol yoki faol emasligi",
  })
  @Field()
  @Column({ type: "boolean", default: true, nullable: true })
  is_active: boolean;

  @Field()
  @Column({ type: "varchar", nullable: true })
  refersh_token_hash: string;

  @ManyToMany(() => Branch, (branch) => branch.admin)
  branch: Branch[];

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
