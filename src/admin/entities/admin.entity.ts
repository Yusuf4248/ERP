import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("admin")
export class Admin {
  @ApiProperty({ example: 1, description: "Adminning unikal identifikatori" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali", description: "Adminning ismi" })
  @Column({ type: "varchar" })
  first_name: string;

  @ApiProperty({ example: "Valiyev", description: "Adminning familiyasi" })
  @Column({ type: "varchar" })
  last_name: string;

  @ApiProperty({
    example: "ali.valiyev@gmail.com",
    description: "Email manzili (yagona bo'lishi kerak)",
  })
  @Column({ type: "varchar", unique: true })
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami (yagona bo'lishi kerak)",
  })
  @Column({ type: "varchar", unique: true })
  phone: string;

  @ApiProperty({
    example: "$2b$10$hashedValueHere",
    description: "Parolning hashlangan ko'rinishi",
  })
  @Column({ type: "varchar" })
  password_hash: string;

  @ApiProperty({
    example: false,
    description: "Administrator yaratuvchi bo'lib hisoblanadimi",
  })
  @Column({ type: "boolean", default: false, nullable: true })
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Administrator faol yoki faol emasligi",
  })
  @Column({ type: "boolean", default: true, nullable: true })
  is_active: boolean;

  @Column({ type: "varchar", nullable: true })
  refersh_token_hash: string;
}
