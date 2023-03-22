import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { GroupsService } from 'src/groups/groups.service';
export declare class CoursesService {
    private coursesRepository;
    private groupsService;
    constructor(coursesRepository: Repository<CourseEntity>, groupsService: GroupsService);
    getAllCourses(): Promise<CourseEntity[]>;
    getCourseByName(name: string): Promise<CourseEntity>;
    getCourseById(id: number): Promise<CourseEntity>;
    createCourse(dto: CreateCourseDto): Promise<CourseEntity>;
    removeCourse(id: number): Promise<CourseEntity>;
    private checkAndReturnGroupById;
}
