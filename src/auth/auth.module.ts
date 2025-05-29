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
import { LidModule } from "../lid/lid.module";
import { LidAuthController } from "./lid/lid.auth.controller";
import { LidAuthService } from "./lid/lid.auth.service";

@Module({
  imports: [TeacherModule, AdminModule, StudentModule, JwtModule, LidModule],
  controllers: [
    TeacherAuthController,
    AdminAuthController,
    StudentAuthController,
    LidAuthController,
  ],
  providers: [
    TeacherAuthService,
    AdminAuthService,
    StudentAuthService,
    LidAuthService,
  ],
})
export class AuthModule {}
