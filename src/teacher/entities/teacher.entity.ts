import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("teacher")
export class Teacher {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali" })
  @Column({ type: "varchar" })
  first_name: string;

  @ApiProperty({ example: "Valiyev" })
  @Column({ type: "varchar" })
  last_name: string;

  @ApiProperty({ example: "ali@example.com" })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({ example: "hashed_password" })
  @Column({ type: "varchar" })
  password: string;

  @ApiProperty({ example: "+998901234567" })
  @Column({ type: "varchar", unique: true })
  phone: string;

  @ApiProperty({
    example: "main teacher",
    enum: ["assistant teacher", "main teacher"],
  })
  @Column({ type: "enum", enum: ["assistant teacher", "main teacher"] })
  role: "assistant teacher" | "main teacher";

  @ApiProperty({ example: true })
  @Column({ type: "boolean", default: true, nullable: true })
  is_active: boolean;

  @Column({ type: "varchar", nullable: true })
  refersh_token_hash: string;
}
