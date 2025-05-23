import { ObjectType, Field } from "@nestjs/graphql";
import { Teacher } from "../entities/teacher.entity";

@ObjectType()
export class TeacherResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => Teacher)
  newTeacher: Teacher;
}

@ObjectType()
export class RemoveResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;
}

@ObjectType()
export class FindAllTeachersResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field(() => [Teacher])
  teachers: Teacher[];
}

@ObjectType()
export class ChangePasswordResponse {
  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field()
  new_pass: string;
}
