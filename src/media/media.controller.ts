import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Media } from "./entities/media.entity";

@ApiTags("Media")
@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ApiOperation({ summary: "Yangi media fayl qo'shish" })
  @ApiResponse({ status: 201, description: "Media yaratildi", type: Media })
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha media fayllarni olish" })
  @ApiResponse({ status: 200, description: "Media ro'yxati", type: [Media] })
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta media faylni olish" })
  @ApiResponse({ status: 200, description: "Topilgan media", type: Media })
  findOne(@Param("id") id: string) {
    return this.mediaService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Media faylni yangilash" })
  @ApiResponse({ status: 200, description: "Media yangilandi", type: Media })
  update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Media faylni o'chirish" })
  @ApiResponse({ status: 200, description: "Media o'chirildi" })
  remove(@Param("id") id: string) {
    return this.mediaService.remove(+id);
  }
}
