import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { AddStudentToLessonDto } from './dto/add-student-to-lesson.dto';
import { RemoveStudentFromLessonDto } from './dto/remove-student-from-lesson.dto';
import { GetAllLessonsWithFiltersDto } from "./dto/get-all-lessons-with-filters.dto";
export declare class LessonsController {
    private lessonsService;
    constructor(lessonsService: LessonsService);
    getAllGroups(): Promise<import("./entities/lesson.entity").LessonEntity[]>;
    getByGroupId(id: number): Promise<import("./entities/lesson.entity").LessonEntity>;
    createLesson(dto: CreateLessonDto): Promise<import("./entities/lesson.entity").LessonEntity>;
    addStudentToLesson(dto: AddStudentToLessonDto): Promise<import("./entities/lesson.entity").LessonEntity>;
    removeStudentFromLesson(dto: RemoveStudentFromLessonDto): Promise<import("./entities/lesson.entity").LessonEntity>;
    getAllLessonsWithFilters(dto: GetAllLessonsWithFiltersDto): Promise<import("./entities/lesson.entity").LessonEntity[]>;
}
