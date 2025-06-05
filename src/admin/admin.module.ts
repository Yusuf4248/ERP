import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { AdminResolver } from "./admin.resolver";
import { Branch } from "../branches/entities/branch.entity";
import { BranchesModule } from "../branches/branches.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Branch]),
    BranchesModule,
    JwtModule,
  ],
  controllers: [AdminController],
  providers: [AdminResolver, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
