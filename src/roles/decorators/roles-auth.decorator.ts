import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../roles.constants';
import { RoleVariant } from '../roles.types';

export const Roles = (...roles: RoleVariant[]) => SetMetadata(ROLES_KEY, roles);
