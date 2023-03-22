import { GroupEntity } from '../../groups/entities/group.entity';
import { LessonEntity } from '../../lessons/entities/lesson.entity';
export declare class SubjectEntity {
    id: number;
    name: string;
    groups: GroupEntity[];
    lessons: LessonEntity[];
}
