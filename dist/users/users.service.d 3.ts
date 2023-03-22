import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { CoursesService } from '../courses/courses.service';
import { GroupsService } from '../groups/groups.service';
import { RoleVariant } from '../roles/roles.types';
import { ManagementMode } from './users.types';
export declare class UsersService {
    private usersRepository;
    private rolesService;
    private coursesService;
    private groupsService;
    constructor(usersRepository: Repository<UserEntity>, rolesService: RolesService, coursesService: CoursesService, groupsService: GroupsService);
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    updateUser(currentUID: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    removeUser(uid: string): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[] | NotFoundException>;
    getAllUsersByGroupId(groupId: number): Promise<UserEntity[] | NotFoundException>;
    getUserByUID(uid: string): Promise<UserEntity>;
    checkUserUID(uid: string): Promise<{
        mode: ManagementMode;
        userInfo?: undefined;
    } | {
        mode: ManagementMode;
        userInfo: {
            role: RoleVariant;
            uid: string;
            email: string;
            fio: string;
            password: string;
            course: import("../courses/entities/course.entity").CourseEntity;
            group: import("../groups/entities/group.entity").GroupEntity;
            lessons: import("../lessons/entities/lesson.entity").LessonEntity[];
        };
    }>;
    getUserByEmail(email: string): Promise<UserEntity>;
    findUserByEmail(email: string): Promise<UserEntity>;
    findUserByUID(uid: string): Promise<UserEntity>;
}
