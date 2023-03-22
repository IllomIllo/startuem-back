import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.course)
  @JoinTable()
  users: UserEntity[];

  @ManyToOne(() => CourseEntity, (course) => course.groups)
  @JoinTable()
  course: CourseEntity;

  @ManyToMany(() => SubjectEntity, (subjects) => subjects.groups)
  subjects: SubjectEntity[];

  @OneToMany(() => LessonEntity, (lessons) => lessons.group)
  lessons: LessonEntity[];
}
