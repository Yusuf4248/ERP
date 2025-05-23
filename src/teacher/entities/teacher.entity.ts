import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("teacher")
export class Teacher {
  @ApiProperty({ example: 1 })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali" })
  @Field()
  @Column({ type: "varchar" })
  first_name: string;

  @ApiProperty({ example: "Valiyev" })
  @Field()
  @Column({ type: "varchar" })
  last_name: string;

  @Field()
  @ApiProperty({ example: "ali@example.com" })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ example: "hashed_password" })
  @Field()
  @Column({ type: "varchar" })
  password: string;

  @ApiProperty({ example: "+998901234567" })
  @Field()
  @Column({ type: "varchar", unique: true })
  phone: string;

  @ApiProperty({
    example: "main teacher",
    enum: ["assistant teacher", "main teacher"],
  })
  @Field()
  @Column({ type: "enum", enum: ["assistant teacher", "main teacher"] })
  role: "assistant teacher" | "main teacher";

  @ApiProperty({ example: true })
  @Field()
  @Column({ type: "boolean", default: true, nullable: true })
  is_active: boolean;

  @Field()
  @Column({ type: "varchar", nullable: true })
  refersh_token_hash: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
