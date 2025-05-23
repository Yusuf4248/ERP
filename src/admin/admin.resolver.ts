import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ChangePasswordDto } from "../student/dto/change-password.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Admin } from "typeorm";

@Resolver("admin")
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  createAdmin(@Args("createAdmin") createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Query(() => [Admin])
  findAllAdmin() {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  findOneAdmin(@Args("id", { type: () => ID }) id: string) {
    return this.adminService.findOne(+id);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateAdmin") updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args("id", { type: () => ID }) id: string) {
    return this.adminService.remove(+id);
  }

  @Mutation(() => Admin)
  changePasswordAdmin(
    @Args("id", { type: () => ID }) id: string,
    @Args("changePasswordAdmin") changePasswordDto: ChangePasswordDto
  ) {
    return this.adminService.changePassword(+id, changePasswordDto);
  }
}
