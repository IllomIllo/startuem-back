import { RoleVariant } from '../../roles/roles.types';
export declare class UpdateUserDto {
    readonly uid?: string;
    readonly email?: string;
    readonly fio?: string;
    readonly role?: RoleVariant;
    readonly password?: string;
    readonly courseId?: number;
    readonly groupId?: number;
}
