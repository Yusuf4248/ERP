import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UpdateAdminStatusDto } from "./dto/update-admin-status.dto";
import { SuperAdminGuard } from "../common/guards/superadmin.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/role.guard";
import { Roles } from "../app.constants";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";

@ApiTags("Admin")
@ApiBearerAuth("JWT-auth")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(SuperAdminGuard)
  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({ status: 201, description: "Admin successfully created." })
  @ApiResponse({
    status: 403,
    description: "Faqat super adminlar ushbu amalni bajara oladi",
  })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(SuperAdminGuard)
  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "List of all admins." })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a single admin by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin found." })
  @ApiResponse({ status: 404, description: "Admin not found." })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("superadmin", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update admin information" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin updated." })
  @ApiBody({ type: UpdateAdminDto })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(SuperAdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete an admin by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin deleted." })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(AuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("superadmin", "admin")
  @Patch("change_password/:id")
  @ApiOperation({ summary: "Change admin password" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: "Password changed successfully." })
  @ApiResponse({ status: 400, description: "Invalid input or mismatch." })
  changePassword(
    @Param("id") id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.adminService.changePassword(+id, changePasswordDto);
  }

  @UseGuards(SuperAdminGuard)
  @Patch(":id/status")
  @ApiOperation({
    summary: "Admin statuslarini (is_creator, is_active) yangilash",
  })
  @ApiParam({
    name: "id",
    description: "Yangilanishi kerak bo'lgan admin IDsi",
    example: 1,
  })
  @ApiBody({
    type: UpdateAdminStatusDto,
    description: "Yangilanishi kerak bo'lgan statuslar",
  })
  @ApiResponse({
    status: 200,
    description: "Admin statuslari muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Yaroqli maydonlar yuborilmadi (is_creator yoki is_active)",
  })
  @ApiResponse({
    status: 404,
    description: "Admin topilmadi",
  })
  @ApiResponse({
    status: 403,
    description: "Faqat super adminlar ushbu amalni bajara oladi",
  })
  async updateAdminStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateAdminStatusDto
  ) {
    return this.adminService.updateStatus(id, dto);
  }

  @Patch(":id/branch/:branchId")
  addBranch(@Param("id") id: string, @Param("branchId") branchId: string) {
    return this.adminService.addBranch(+branchId, +id);
  }
}
