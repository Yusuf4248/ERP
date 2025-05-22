import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentModule } from "./student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_POTR),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    StudentModule,
    AdminModule,
    TeacherModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
