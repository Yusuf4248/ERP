import { ObjectType, Field, Float, Int } from "@nestjs/graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("media")
export class Media {
  @ApiProperty({ example: 1, description: "Media yozuvining unikal ID raqami" })
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ApiProperty({
    example: 42,
    description: "Bog'langan jadvaldagi yozuv IDsi (masalan: homework.id)",
  })
  @Column({ type: "bigint" })
  @Field(() => Int)
  table_id: number;

  @ApiProperty({
    example: "homework",
    description:
      "Bog'langan jadval nomi (masalan: homework yoki homework_submission)",
  })
  @Column()
  @Field()
  table_name: string;

  @ApiProperty({
    example: "https://example.com/uploads/assignment1.pdf",
    description: "Fayl URL yoki yo'li",
  })
  @Column()
  @Field()
  files: string;

  @ApiProperty({
    example: "application/pdf",
    description: "Fayl turi (MIME type)",
  })
  @Column()
  @Field()
  type: string;

  @ApiProperty({ example: "assignment1.pdf", description: "Fayl nomi" })
  @Column()
  @Field()
  file_name: string;

  @ApiProperty({ example: 2.54, description: "Fayl hajmi megabaytlarda" })
  @Column({ type: "decimal" })
  @Field(() => Float)
  size: number;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updated_at: Date;
}
