import { PartialType } from "@nestjs/swagger";
import { CreateAdminDto } from "./create-admin.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
