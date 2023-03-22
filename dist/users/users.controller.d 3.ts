import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { RoleVariant } from '../roles/roles.types';
import { UpdateUserDto } from './dto/update.user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    getAllUsers(): Promise<import("./entities/user.entity").UserEntity[] | import("@nestjs/common").NotFoundException>;
    getAllUsersByGroupId(groupId: number): Promise<import("./entities/user.entity").UserEntity[] | import("@nestjs/common").NotFoundException>;
    getUserByEmail(login: string): Promise<import("./entities/user.entity").UserEntity>;
    getUserByUID(uid: string): Promise<import("./entities/user.entity").UserEntity>;
    checkUserUID(uid: string): Promise<{
        mode: import("./users.types").ManagementMode;
        userInfo?: undefined;
    } | {
        mode: import("./users.types").ManagementMode;
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
    updateUser(updateUserDto: UpdateUserDto, uid: any): Promise<import("./entities/user.entity").UserEntity>;
    removeUser(uid: any): Promise<import("./entities/user.entity").UserEntity>;
}
