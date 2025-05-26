import { PartialType } from "@nestjs/swagger";
import { CreateTeacherGroupDto } from "./create-teacher-group.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTeacherGroupDto extends PartialType(CreateTeacherGroupDto) {}
