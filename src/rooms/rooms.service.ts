import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "./entities/room.entity";
import { Repository } from "typeorm";
import { BranchesService } from "../branches/branches.service";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepo: Repository<Room>,
    private readonly branchesService: BranchesService
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    const branch = await this.branchesService.findOne(createRoomDto.branchId);
    const newRoom = await this.roomRepo.save({
      branch: branch.branch,
      ...createRoomDto,
    });
    return {
      message: "New branch created!",
      success: true,
      newRoom,
    };
  }

  async findAll() {
    const rooms = await this.roomRepo.find({ relations: ["branch"] });
    if (rooms.length == 0) {
      throw new NotFoundException("Room not found");
    }
    return {
      message: "All rooms",
      success: true,
      rooms,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const room = await this.roomRepo.findOne({
      where: { id },
      relations: ["branch"],
    });
    if (!room) {
      throw new NotFoundException(`${id}-room not found`);
    }
    return {
      message: `${id}-room`,
      success: true,
      room,
    };
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.roomRepo.update({ id }, updateRoomDto);

    const room = await this.findOne(id);
    return {
      message: `${id}-room data updated!`,
      success: true,
      room: room.room,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.roomRepo.delete(id);

    return {
      message: `${id}-room deleted!`,
      success: true,
    };
  }
}
