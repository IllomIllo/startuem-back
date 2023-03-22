import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: Response): Promise<void>;
    register(registerUserDto: RegisterUserDto): Promise<import("../users/entities/user.entity").UserEntity>;
    validateToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            uid: string;
            role: import("../roles/roles.types").RoleVariant;
            fio: string;
            email: string;
            group: string | import("../groups/entities/group.entity").GroupEntity;
            course: string | import("../courses/entities/course.entity").CourseEntity;
        };
    }>;
    refreshToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            uid: string;
            role: import("../roles/roles.types").RoleVariant;
            fio: string;
            email: string;
            group: string | import("../groups/entities/group.entity").GroupEntity;
            course: string | import("../courses/entities/course.entity").CourseEntity;
        };
    }>;
    logout(res: Response): void;
}
