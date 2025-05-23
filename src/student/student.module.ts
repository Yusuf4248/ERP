import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { Student } from "./entities/student.entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentResolver } from "./student.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
