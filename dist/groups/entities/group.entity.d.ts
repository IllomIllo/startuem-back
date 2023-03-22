import { UserEntity } from '../../users/entities/user.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
export declare class GroupEntity {
    id: number;
    name: string;
    users: UserEntity[];
    course: CourseEntity;
    subjects: SubjectEntity[];
    lessons: LessonEntity[];
}
