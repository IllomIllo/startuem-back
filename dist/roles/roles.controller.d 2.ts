import { RolesService } from './roles.service';
import { RoleVariant } from './roles.types';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    getAllRoles(): Promise<import("./entities/role.entity").RoleEntity[]>;
    getRoleByVariant(variant: RoleVariant): Promise<import("./entities/role.entity").RoleEntity>;
    getByRoleId(id: number): Promise<import("./entities/role.entity").RoleEntity>;
    createRole(dto: CreateRoleDto): Promise<import("./entities/role.entity").RoleEntity>;
}
