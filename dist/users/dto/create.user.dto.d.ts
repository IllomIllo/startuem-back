import { RoleVariant } from '../../roles/roles.types';
export declare class CreateUserDto {
    uid: string;
    fio: string;
    email: string;
    password: string;
    role: RoleVariant;
    readonly courseId?: number;
    readonly groupId?: number;
}
