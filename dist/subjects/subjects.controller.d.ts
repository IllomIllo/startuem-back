import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
export declare class SubjectsController {
    private subjectsService;
    constructor(subjectsService: SubjectsService);
    getAllSubjects(): Promise<import("./entities/subject.entity").SubjectEntity[]>;
    getSubjectByVariant(name: string): Promise<import("./entities/subject.entity").SubjectEntity>;
    getByGroupId(id: number): Promise<import("./entities/subject.entity").SubjectEntity>;
    getSubjectsByCourseId(id: number): Promise<import("./entities/subject.entity").SubjectEntity[]>;
    createSubject(dto: CreateSubjectDto): Promise<import("./entities/subject.entity").SubjectEntity>;
    removeSubject(id: number): Promise<import("./entities/subject.entity").SubjectEntity>;
}
