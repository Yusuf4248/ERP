import { Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { Repository } from "typeorm";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private readonly mediaRepo: Repository<Media>
  ) {}
  async create(createMediaDto: CreateMediaDto) {
    const newMedia = await this.mediaRepo.save(createMediaDto);
    return {
      message: "New media created!",
      success: true,
      newMedia,
    };
  }

  findAll() {
    return this.mediaRepo.find();
  }

  findOne(id: number) {
    return this.mediaRepo.findOneBy({ id });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaRepo.update({ id }, updateMediaDto);
  }

  remove(id: number) {
    return this.mediaRepo.delete(id);
  }
}
