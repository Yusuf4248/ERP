import { Module } from "@nestjs/common";
import { TeacherAuthService } from "./teacher/teacher.auth.service";
import { TeacherAuthController } from "./teacher/teacher.auth.controller";
import { TeacherModule } from "../teacher/teacher.module";
import { AdminModule } from "../admin/admin.module";
import { StudentModule } from "../student/student.module";
import { JwtModule } from "@nestjs/jwt";
import { AdminAuthController } from "./admin/admin.auth.controller";
import { AdminAuthService } from "./admin/admin.auth.service";
import { StudentAuthController } from "./student/student.auth.controller";
import { StudentAuthService } from "./student/student.auth.service";

@Module({
  imports: [TeacherModule, AdminModule, StudentModule, JwtModule],
  controllers: [
    TeacherAuthController,
    AdminAuthController,
    StudentAuthController,
  ],
  providers: [TeacherAuthService, AdminAuthService, StudentAuthService],
})
export class AuthModule {}
