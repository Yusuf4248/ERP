import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("student")
export class Student {
  @ApiProperty({
    example: 1,
    description: "O'quvchining unikal identifikatori",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Ali",
    description: "O'quvchining ismi",
  })
  @Column({ type: "varchar" })
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "O'quvchining familiyasi",
  })
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
    example: true,
    description: "Holati: faol yoki nofaol",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    example: "male",
    description: "Jinsi: faqat 'male' yoki 'female'",
  })
  @Column({
    type: "enum",
    enum: ["male", "female"],
  })
  gender: "male" | "female";

  @ApiProperty({
    example: "2005-06-15",
    description: "Tug'ilgan sana (YYYY-MM-DD)",
  })
  @Column({ type: "date" })
  date_of_birth: Date;

  @ApiProperty({
    example: "https://example.com/uploads/avatar.jpg",
    description: "Profil rasmi uchun URL",
  })
  @Column({ nullable: true })
  avatar_url: string;

  @Column({ type: "varchar", nullable: true })
  refersh_token_hash: string;
}
