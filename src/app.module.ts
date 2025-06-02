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
import { SchedulesModule } from "./schedules/schedules.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { HomeworksModule } from "./homeworks/homeworks.module";
import { HomeworkSubmissionModule } from "./homework-submission/homework-submission.module";
import { GradesModule } from "./grades/grades.module";
import { LidModule } from "./lid/lid.module";
import { BranchesModule } from "./branches/branches.module";
import { RoomsModule } from "./rooms/rooms.module";
import { EventsModule } from "./events/events.module";
import { PaymentsModule } from "./payments/payments.module";
import { PaymentTypesModule } from "./payment-types/payment-types.module";
import { ExamsModule } from "./exams/exams.module";
import { ExamResultsModule } from "./exam-results/exam-results.module";
import { MediaModule } from './media/media.module';

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
      dropSchema: false,
    }),
    StudentModule,
    AdminModule,
    TeacherModule,
    AuthModule,
    CoursesModule,
    GroupModule,
    SchedulesModule,
    AttendanceModule,
    HomeworksModule,
    HomeworkSubmissionModule,
    GradesModule,
    LidModule,
    BranchesModule,
    RoomsModule,
    EventsModule,
    PaymentsModule,
    PaymentTypesModule,
    ExamsModule,
    ExamResultsModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
