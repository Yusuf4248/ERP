import { forwardRef, Module } from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { LessonsController } from "./lessons.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./entities/lesson.entity";
import { Group } from "../group/entities/group.entity";
import { JwtModule } from "@nestjs/jwt";
import { GroupModule } from "../group/group.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Group]),
    JwtModule,
    forwardRef(() => GroupModule),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
