import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LidService } from "./lid.service";
import { CreateLidDto } from "./dto/create-lid.dto";
import { UpdateLidDto } from "./dto/update-lid.dto";
import { GetLidsByStatusDto } from "./dto/get-lid-by-status.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiOkResponse,
} from "@nestjs/swagger";

@Controller("lid")
export class LidController {
  constructor(private readonly lidService: LidService) {}

  @Post()
  @ApiOperation({ summary: "Yangi lid yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi lid muvaffaqiyatli yaratildi",
  })
  create(@Body() createLidDto: CreateLidDto) {
    return this.lidService.create(createLidDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha lidlarni olish" })
  @ApiResponse({ status: 200, description: "Lidlar ro'yxati" })
  findAll() {
    return this.lidService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha lidni olish" })
  @ApiResponse({ status: 200, description: "Lid topildi" })
  @ApiResponse({ status: 404, description: "Lid topilmadi" })
  findOne(@Param("id") id: string) {
    return this.lidService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Lidni yangilash" })
  @ApiResponse({ status: 200, description: "Lid muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateLidDto: UpdateLidDto) {
    return this.lidService.update(+id, updateLidDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Lidni o'chirish" })
  @ApiResponse({ status: 200, description: "Lid muvaffaqiyatli o'chirildi" })
  remove(@Param("id") id: string) {
    return this.lidService.remove(+id);
  }

  @Post("by-status")
  @ApiOperation({ summary: "Status bo'yicha lidlarni olish" })
  @ApiBody({ type: GetLidsByStatusDto })
  @ApiOkResponse({
    description: "Berilgan status bo'yicha lidlar va ularning soni",
    schema: {
      example: {
        count: 2,
        data: [
          {
            id: 1,
            first_name: "Ali",
            last_name: "Valiyev",
            lid_status: "yangi",
          },
          {
            id: 2,
            first_name: "Laylo",
            last_name: "Olimova",
            lid_status: "yangi",
          },
        ],
      },
    },
  })
  async getLidsByStatus(@Body() body: GetLidsByStatusDto) {
    return this.lidService.findByStatus(body.status);
  }
}
