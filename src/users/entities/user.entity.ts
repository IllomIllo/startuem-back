import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { GroupEntity } from '../../groups/entities/group.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';

@Entity()
export class UserEntity {
  @Column({
    nullable: false,
    primary: true,
  })
  uid: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    // TODO: replaced with nullable false
    nullable: true,
  })
  fio: string;

  @Column({
    nullable: false,
  })
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinTable()
  role: RoleEntity;

  @ManyToOne(() => CourseEntity, (course) => course.users)
  @JoinTable()
  course: CourseEntity;

  @ManyToOne(() => GroupEntity, (group) => group.users)
  @JoinTable()
  group: GroupEntity;

  @ManyToMany(() => LessonEntity, (lesson) => lesson.students)
  @JoinTable()
  lessons: LessonEntity[];
}
