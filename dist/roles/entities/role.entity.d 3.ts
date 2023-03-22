import { RoleVariant } from '../roles.types';
import { UserEntity } from '../../users/entities/user.entity';
export declare class RoleEntity {
    id: number;
    variant: RoleVariant;
    users: UserEntity[];
}
