import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { GroupEntity } from '../../groups/entities/group.entity';

@Entity()
export class LessonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => UserEntity, (student) => student.lessons)
  students: UserEntity[];

  @ManyToOne(() => CourseEntity)
  course: CourseEntity;

  @ManyToOne(() => GroupEntity)
  group: GroupEntity;

  @ManyToOne(() => SubjectEntity)
  subject: SubjectEntity;

  @ManyToOne(() => UserEntity)
  teacher: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
