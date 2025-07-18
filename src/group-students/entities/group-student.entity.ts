import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Student } from "../../student/entities/student.entities";

@Entity("group-students")
export class GroupStudent {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 2, description: "Group ID", type: () => Group })
  @ManyToOne(() => Group, (group) => group.groupStudents, {
    onDelete: "CASCADE",
  })
  group: Group;

  @ApiProperty({ example: 5, description: "Student ID", type: () => Student })
  @ManyToOne(() => Student, (student) => student.groupStudents, {
    onDelete: "CASCADE",
  })
  student: Student;

  @ApiProperty({
    example: true,
    description: "Status of the teacher in the group (active/inactive)",
  })
  @Column({ type: "boolean" })
  status: boolean;

  @ApiProperty({
    example: "2025/01/01 - 2025/12/01",
    description: "Period of the group",
  })
  @Column()
  period: Date;
}
