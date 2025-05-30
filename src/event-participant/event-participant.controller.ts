import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateEventParticipantDto } from "./dto/create-event-participant.dto";
import { UpdateEventParticipantDto } from "./dto/update-event-participant.dto";
import { EventParticipantService } from "./event-participant.service";

@ApiTags("Event Participants")
@Controller("event-participants")
export class EventParticipantController {
  constructor(
    private readonly eventParticipantsService: EventParticipantService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi ishtirokchi qo'shish" })
  @ApiResponse({ status: 201, description: "Ishtirokchi yaratildi." })
  create(@Body() createEventParticipantDto: CreateEventParticipantDto) {
    return this.eventParticipantsService.create(createEventParticipantDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ishtirokchilarni olish" })
  @ApiResponse({ status: 200, description: "Ishtirokchilar royxati." })
  findAll() {
    return this.eventParticipantsService.findAll();
  }

  @Get("findOne")
  @ApiOperation({ summary: "Bitta ishtirokchini olish" })
  @ApiResponse({ status: 200, description: "Ishtirokchi topildi." })
  findOne(
    @Body("student_id") student_id: string,
    @Body("event_id") event_id: string
  ) {
    return this.eventParticipantsService.findOne(+student_id, +event_id);
  }

  @Patch("update")
  @ApiOperation({ summary: "Ishtirokchini yangilash" })
  update(@Body() updateEventParticipantDto: UpdateEventParticipantDto) {
    return this.eventParticipantsService.update(updateEventParticipantDto);
  }

  @Delete("delete")
  @ApiOperation({ summary: "Ishtirokchini o'chirish" })
  remove(
    @Body("student_id") student_id: string,
    @Body("event_id") event_id: string
  ) {
    return this.eventParticipantsService.remove(+student_id, +event_id);
  }
}
