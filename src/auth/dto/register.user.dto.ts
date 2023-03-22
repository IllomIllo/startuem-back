import { RoleVariant } from '../../roles/roles.types';

export class RegisterUserDto {
  uid: string;
  email: string;
  fio: string;
  password: string;
  role: RoleVariant.Student | RoleVariant.Teacher;
  readonly courseId?: number;
  readonly groupId?: number;
}
