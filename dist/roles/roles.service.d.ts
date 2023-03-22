import { RoleVariant } from './roles.types';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<RoleEntity>);
    getAllRoles(): Promise<RoleEntity[]>;
    getRoleByVariant(variant: RoleVariant): Promise<RoleEntity>;
    getRoleById(id: number): Promise<RoleEntity>;
    createRole(dto: CreateRoleDto): Promise<RoleEntity>;
}
