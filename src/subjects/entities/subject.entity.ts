import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { GroupEntity } from '../../groups/entities/group.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => GroupEntity, (group) => group.subjects)
  @JoinTable()
  groups: GroupEntity[];

  @OneToMany(() => LessonEntity, (lessons) => lessons.subject)
  lessons: LessonEntity[];
}
