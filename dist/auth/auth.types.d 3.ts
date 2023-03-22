import { RoleVariant } from '../roles/roles.types';
export declare type UserJwtPayload = {
    email: string;
    role: RoleVariant;
    sub: string;
};
