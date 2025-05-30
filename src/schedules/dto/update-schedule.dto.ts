import { PartialType } from "@nestjs/swagger";
import { CreateScheduleDto } from "./create-schedule.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
