import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { CoursesService } from '../courses/courses.service';
export declare class GroupsService {
    private readonly groupsRepository;
    private coursesService;
    constructor(groupsRepository: Repository<GroupEntity>, coursesService: CoursesService);
    getAllGroups(): Promise<GroupEntity[]>;
    getGroupByName(name: string): Promise<GroupEntity>;
    getGroupById(id: number): Promise<GroupEntity>;
    getAllGroupsByCourseId(courseId: number): Promise<GroupEntity[]>;
    createGroup(dto: CreateGroupDto): Promise<GroupEntity>;
}
