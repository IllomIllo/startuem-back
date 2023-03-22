import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { GroupsService } from '../groups/groups.service';
export declare class SubjectsService {
    private subjectsRepository;
    private groupsService;
    constructor(subjectsRepository: Repository<SubjectEntity>, groupsService: GroupsService);
    getAllSubjects(): Promise<SubjectEntity[]>;
    getSubjectByName(name: string): Promise<SubjectEntity>;
    getSubjectById(id: number): Promise<SubjectEntity>;
    getAllSubjectsByGroupId(groupId: number): Promise<SubjectEntity[]>;
    createSubject(dto: CreateSubjectDto): Promise<SubjectEntity>;
    removeSubject(id: number): Promise<SubjectEntity>;
}
