import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";

@Entity("group-teachers")
export class GroupTeacher {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 2, description: "Group ID", type: () => Group })
  @ManyToOne(() => Group, (group) => group.groupTeachers, {
    onDelete: "CASCADE",
  })
  group: Group;

  @ApiProperty({ example: 5, description: "Teacher ID", type: () => Teacher })
  @ManyToOne(() => Teacher, (teacher) => teacher.groupTeachers, {
    onDelete: "CASCADE",
  })
  teacher: Teacher;

  @ApiProperty({
    example: true,
    description: "Status of the teacher in the group (active/inactive)",
  })
  @Column({ type: "boolean" })
  status: boolean;
}
