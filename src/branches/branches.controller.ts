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
import { BranchesService } from "./branches.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../app.constants";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("branches")
@ApiBearerAuth("JWT-auth")
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  @ApiOperation({ summary: "Yangi filial yaratish" })
  @ApiBody({ type: CreateBranchDto })
  @ApiResponse({ status: 201, description: "Filial yaratildi" })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha filiallarni olish" })
  @ApiResponse({ status: 200, description: "Filiallar ro'yxati" })
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta filialni ID orqali olish" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({ status: 200, description: "Topilgan filial" })
  findOne(@Param("id") id: string) {
    return this.branchesService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Filialni yangilash" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiBody({ type: UpdateBranchDto })
  @ApiResponse({ status: 200, description: "Filial yangilandi" })
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Filialni o'chirish" })
  @ApiParam({ name: "id", type: Number, example: 1 })
  @ApiResponse({ status: 200, description: "Filial o'chirildi" })
  remove(@Param("id") id: string) {
    return this.branchesService.remove(+id);
  }
}
