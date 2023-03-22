import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
export declare class GroupsController {
    private groupsService;
    constructor(groupsService: GroupsService);
    getAllGroups(): Promise<import("./entities/group.entity").GroupEntity[]>;
    getGroupByName(name: string): Promise<import("./entities/group.entity").GroupEntity>;
    getByGroupId(id: number): Promise<import("./entities/group.entity").GroupEntity>;
    getByCourseId(id: number): Promise<import("./entities/group.entity").GroupEntity[]>;
    createGroup(dto: CreateGroupDto): Promise<import("./entities/group.entity").GroupEntity>;
}
