import { PartialType } from "@nestjs/swagger";
import { CreateLidDto } from "./create-lid.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateLidDto extends PartialType(CreateLidDto) {}
