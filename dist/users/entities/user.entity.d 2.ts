import { RoleEntity } from '../../roles/entities/role.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { GroupEntity } from '../../groups/entities/group.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
export declare class UserEntity {
    uid: string;
    email: string;
    fio: string;
    password: string;
    role: RoleEntity;
    course: CourseEntity;
    group: GroupEntity;
    lessons: LessonEntity[];
}
