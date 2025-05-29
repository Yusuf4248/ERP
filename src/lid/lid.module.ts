import { Module } from "@nestjs/common";
import { LidService } from "./lid.service";
import { LidController } from "./lid.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lid } from "./entities/lid.entity";
import { Group } from "../group/entities/group.entity";
import { GroupModule } from "../group/group.module";
import { Student } from "../student/entities/student.entities";
import { LidResolver } from "./lid.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Lid, Group, Student]), GroupModule],
  controllers: [LidController],
  providers: [LidService, LidResolver],
  exports: [LidService],
})
export class LidModule {}
