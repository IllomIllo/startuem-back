import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login.user.dto";
import { UserEntity } from "../users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { RegisterUserDto } from "./dto/register.user.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    login(user: UserEntity): Promise<{
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
    register(dto: RegisterUserDto): Promise<UserEntity>;
    validateToken(user: UserEntity): Promise<{
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
    validateUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
    private generateUserTokens;
}
