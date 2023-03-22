import { UserEntity } from '../../users/entities/user.entity';
import { CourseEntity } from '../../courses/entities/course.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { GroupEntity } from '../../groups/entities/group.entity';
export declare class LessonEntity {
    id: number;
    students: UserEntity[];
    course: CourseEntity;
    group: GroupEntity;
    subject: SubjectEntity;
    teacher: UserEntity;
    created_at: Date;
}
