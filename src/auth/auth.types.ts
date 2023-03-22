import { RoleVariant } from '../roles/roles.types';

export type UserJwtPayload = {
  email: string;
  role: RoleVariant;
  sub: string;
}