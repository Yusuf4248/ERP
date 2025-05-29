import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Branch } from "./entities/branch.entity";
import { Repository } from "typeorm";

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    const newBranch = await this.branchRepo.save(createBranchDto);
    return {
      message: "New branch created",
      success: true,
      newBranch,
    };
  }

  async findAll() {
    const branch = await this.branchRepo.find();
    if (branch.length == 0) {
      throw new NotFoundException("Branch not found");
    }
    return {
      message: "All branches",
      success: true,
      branch,
    };
  }

  async findOne(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`${id}-branch not found`);
    }
    return {
      message: `${id}-branch`,
      succes: true,
      branch,
    };
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.branchRepo.update({ id }, updateBranchDto);

    const branch = await this.findOne(id);
    return {
      message: `${id}-branch data updated!`,
      success: true,
      branch: branch.branch,
    };
  }

  async remove(id: number) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      throw new BadRequestException(
        "ID must be integer and must be greater than zero"
      );
    }
    await this.findOne(id);
    await this.branchRepo.delete(id);
    return {
      message: `${id}-branch deleted`,
      success: true,
    };
  }
}
