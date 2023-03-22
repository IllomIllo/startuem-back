import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { GroupEntity } from '../../groups/entities/group.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.course)
  users: UserEntity[];

  @OneToMany(() => GroupEntity, (group) => group.course)
  groups: GroupEntity[];

  @OneToMany(() => LessonEntity, (lessons) => lessons.course)
  lessons: LessonEntity[];
}
