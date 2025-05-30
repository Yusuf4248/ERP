import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
} from "@nestjs/swagger";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({ status: 201, description: "Admin successfully created." })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "List of all admins." })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single admin by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin found." })
  @ApiResponse({ status: 404, description: "Admin not found." })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update admin information" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin updated." })
  @ApiBody({ type: UpdateAdminDto })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an admin by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin deleted." })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

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
}
