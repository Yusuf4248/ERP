import { InputType, Field, Float, PartialType } from "@nestjs/graphql";
import { CreateMediaDto } from "./create-media.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

@InputType()
export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  table_id?: number;

  @ApiPropertyOptional({ example: "homework" })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  table_name?: string;

  @ApiPropertyOptional({ example: "https://domain.com/uploads/file.pdf" })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  files?: string;

  @ApiPropertyOptional({ example: "application/pdf" })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  type?: string;

  @ApiPropertyOptional({ example: "file.pdf" })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  file_name?: string;

  @ApiPropertyOptional({ example: 2.5 })
  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  size?: number;
}
