import { PartialType } from "@nestjs/swagger";
import { CreateStudentDto } from "./create-student.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
