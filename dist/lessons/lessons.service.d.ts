import { Repository } from "typeorm";
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CoursesService } from '../courses/courses.service';
import { GroupsService } from '../groups/groups.service';
import { SubjectsService } from '../subjects/subjects.service';
import { UsersService } from '../users/users.service';
import { AddStudentToLessonDto } from './dto/add-student-to-lesson.dto';
import { RemoveStudentFromLessonDto } from './dto/remove-student-from-lesson.dto';
import { GetAllLessonsWithFiltersDto } from './dto/get-all-lessons-with-filters.dto';
export declare class LessonsService {
    private lessonsRepository;
    private coursesService;
    private groupsService;
    private subjectsService;
    private usersService;
    constructor(lessonsRepository: Repository<LessonEntity>, coursesService: CoursesService, groupsService: GroupsService, subjectsService: SubjectsService, usersService: UsersService);
    getAllLessons(): Promise<LessonEntity[]>;
    getLessonById(id: number): Promise<LessonEntity>;
    createLesson(dto: CreateLessonDto): Promise<LessonEntity>;
    addStudentToLesson(dto: AddStudentToLessonDto): Promise<void>;
    removeStudentFromLesson(dto: RemoveStudentFromLessonDto): Promise<void>;
    getAllLessonsWithFilters(dto: GetAllLessonsWithFiltersDto): Promise<LessonEntity[]>;
    private checkAndReturnLesson;
    private checkAndReturnStudent;
}
