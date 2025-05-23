import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("student")
export class Student {
  @ApiProperty({
    example: 1,
    description: "O'quvchining unikal identifikatori",
  })
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ApiProperty({
    example: "Ali",
    description: "O'quvchining ismi",
  })
  @Column({ type: "varchar" })
  @Field()
  first_name: string;

  @ApiProperty({
    example: "Valiyev",
    description: "O'quvchining familiyasi",
  })
  @Column({ type: "varchar" })
  @Field()
  last_name: string;

  @ApiProperty({
    example: "ali.valiyev@gmail.com",
    description: "Email manzili (yagona bo'lishi kerak)",
  })
  @Column({ type: "varchar", unique: true })
  @Field()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami (yagona bo'lishi kerak)",
  })
  @Column({ type: "varchar", unique: true })
  @Field()
  phone: string;

  @ApiProperty({
    example: "$2b$10$hashedValueHere",
    description: "Parolning hashlangan ko'rinishi",
  })
  @Column({ type: "varchar" })
  @Field()
  password_hash: string;

  @ApiProperty({
    example: true,
    description: "Holati: faol yoki nofaol",
  })
  @Column({ default: true })
  @Field()
  is_active: boolean;

  @ApiProperty({
    example: "male",
    description: "Jinsi: faqat 'male' yoki 'female'",
  })
  @Column({
    type: "enum",
    enum: ["male", "female"],
  })
  @Field()
  gender: "male" | "female";

  @ApiProperty({
    example: "2005-06-15",
    description: "Tug'ilgan sana (YYYY-MM-DD)",
  })
  @Column({ type: "date" })
  @Field()
  date_of_birth: Date;

  @ApiProperty({
    example: "https://example.com/uploads/avatar.jpg",
    description: "Profil rasmi uchun URL",
  })
  @Column({ nullable: true })
  @Field()
  avatar_url: string;

  @Column({ type: "varchar", nullable: true })
  @Field()
  refersh_token_hash: string;
}
