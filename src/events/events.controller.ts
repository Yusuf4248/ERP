import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "./entities/event.entity";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { FilterEventDto } from "./dto/filter-event.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../app.constants";

@ApiTags("Events")
@ApiBearerAuth("JWT-auth")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi tadbir yaratish" })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ status: 201, description: "Tadbir yaratildi", type: Event })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "student", "teacher")
  @Get()
  @ApiOperation({ summary: "Barcha tadbirlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Tadbirlar ro'yxati",
    type: [Event],
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "student", "teacher")
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha tadbirni olish" })
  @ApiParam({ name: "id", description: "Tadbirning ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Topilgan tadbir", type: Event })
  findOne(@Param("id") id: string) {
    return this.eventsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Tadbirni yangilash" })
  @ApiParam({ name: "id", description: "Tadbirning ID raqami", example: 1 })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({ status: 200, description: "Yangilangan tadbir", type: Event })
  update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Tadbirni o'chirish" })
  @ApiParam({ name: "id", description: "Tadbirning ID raqami", example: 1 })
  @ApiResponse({ status: 200, description: "Tadbir o'chirildi" })
  remove(@Param("id") id: string) {
    return this.eventsService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "student", "teacher")
  @Post("filter-by-date")
  @ApiOperation({ summary: "Vaqt oralig'i bo'yicha filter" })
  @ApiBody({ type: FilterEventDto })
  @ApiResponse({
    status: 200,
    description: "Oraliqqa mos keladigan tadbirlar",
    type: [Event],
  })
  filterByDate(@Body() dto: FilterEventDto) {
    return this.eventsService.findByDateRange(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "student", "teacher")
  @Post("filter-by-status")
  @ApiOperation({ summary: "Status bo'yicha filter" })
  @ApiBody({ type: FilterEventDto })
  @ApiResponse({
    status: 200,
    description: "Berilgan statusga mos tadbirlar",
    type: [Event],
  })
  filterByStatus(@Body() dto: FilterEventDto) {
    return this.eventsService.findByStatus(dto);
  }
}
