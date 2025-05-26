import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./admin/admin.module";
import { TeacherModule } from "./teacher/teacher.module";
import { AuthModule } from "./auth/auth.module";
import { CoursesModule } from "./courses/courses.module";
import { GroupModule } from "./group/group.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TeacherGroupsModule } from "./teacher-groups/teacher-groups.module";
import { SchedulesModule } from "./schedules/schedules.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { StudentGroupsModule } from "./student-groups/student-groups.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: "schema.gql",
    //   sortSchema: true,
    //   playground: true,
    // }),
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
    CoursesModule,
    GroupModule,
    TeacherGroupsModule,
    SchedulesModule,
    AttendanceModule,
    StudentGroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
