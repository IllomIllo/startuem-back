import { UserEntity } from '../../users/entities/user.entity';
import { GroupEntity } from '../../groups/entities/group.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
export declare class CourseEntity {
    id: number;
    name: string;
    users: UserEntity[];
    groups: GroupEntity[];
    lessons: LessonEntity[];
}
