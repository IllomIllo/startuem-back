import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    getAllCourses(): Promise<import("./entities/course.entity").CourseEntity[]>;
    getCourseByName(name: string): Promise<import("./entities/course.entity").CourseEntity>;
    getByCourseId(id: number): Promise<import("./entities/course.entity").CourseEntity>;
    createCourse(dto: CreateCourseDto): Promise<import("./entities/course.entity").CourseEntity>;
    removeCourse(uid: any): Promise<import("./entities/course.entity").CourseEntity>;
}
