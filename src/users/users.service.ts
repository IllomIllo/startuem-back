import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { CoursesService } from '../courses/courses.service';
import { GroupsService } from '../groups/groups.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelpers } from '../auth/auth.helpers';
import { RoleVariant } from '../roles/roles.types';
import { ManagementMode } from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private rolesService: RolesService,
    private coursesService: CoursesService,
    private groupsService: GroupsService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const email = createUserDto.email;

    const userWithCurrentLogin = await this.findUserByEmail(email);

    if (userWithCurrentLogin) {
      throw new BadRequestException(
        `Пользовать с email ${email} уже существует. Введите другой email и попробуйте снова.`,
      );
    }

    const roleCandidate = await this.rolesService.getRoleByVariant(
      createUserDto.role,
    );

    if (!roleCandidate) {
      throw new BadRequestException(
        `Роли ${createUserDto.role} не существует. Введите другую роль.`,
      );
    }

    const user = await this.usersRepository.create({
      uid: createUserDto.uid,
      email: createUserDto.email,
      password: createUserDto.password,
      fio: createUserDto.fio,
    });

    if (createUserDto.courseId) {
      const courseCandidate = await this.coursesService.getCourseById(
        createUserDto.courseId,
      );

      if (!courseCandidate) {
        throw new BadRequestException(
          `Курс с id ${createUserDto.courseId} не найден!`,
        );
      }

      user.course = courseCandidate;
    }
    if (createUserDto.groupId) {
      const groupCandidate = await this.groupsService.getGroupById(
        createUserDto.groupId,
      );

      if (!groupCandidate) {
        throw new BadRequestException(
          `Группа с id ${createUserDto.groupId} не найдена!`,
        );
      }

      if (
        !user?.course?.groups?.find((group) => group?.id === groupCandidate.id)
      ) {
        throw new BadRequestException(
          `Курс с id ${user?.course?.id} не содержит группу с id ${groupCandidate.id}`,
        );
      }

      user.group = groupCandidate;
    }

    user.role = roleCandidate;

    return this.usersRepository.save(user);
  }

  async updateUser(currentUID: string, updateUserDto: UpdateUserDto) {
    const userCandidate = await this.usersRepository.findOne({
      where: { uid: currentUID },
    });

    if (!userCandidate) {
      throw new BadRequestException(
        `Пользователь с UID ${currentUID} не найден!`,
      );
    }

    if (updateUserDto.uid) {
      userCandidate.uid = updateUserDto.uid;
    }
    if (updateUserDto.email) {
      userCandidate.email = updateUserDto.email;
    }
    if (updateUserDto.fio) {
      userCandidate.fio = updateUserDto.fio;
    }
    if (updateUserDto.courseId) {
      const courseCandidate = await this.coursesService.getCourseById(
        updateUserDto.courseId,
      );

      if (!courseCandidate) {
        throw new BadRequestException(
          `Курс с id ${updateUserDto.courseId} не найден!`,
        );
      }

      userCandidate.course = courseCandidate;
    }
    if (updateUserDto.groupId) {
      const groupCandidate = await this.groupsService.getGroupById(
        updateUserDto.groupId,
      );

      if (!groupCandidate) {
        throw new BadRequestException(
          `Группа с id ${updateUserDto.groupId} не найдена!`,
        );
      }

      if (
        !userCandidate?.course?.groups?.find(
          (group) => group?.id === groupCandidate.id,
        )
      ) {
        throw new BadRequestException(
          `Курс с id ${userCandidate?.course?.id} не содержит группу с id ${groupCandidate.id}`,
        );
      }

      userCandidate.group = groupCandidate;
    }

    if (updateUserDto.password) {
      userCandidate.password = await AuthHelpers.hashPassword(
        updateUserDto.password,
      );
    }

    if (updateUserDto.role) {
      const roleCandidate = await this.rolesService.getRoleByVariant(
        updateUserDto.role,
      );

      if (!roleCandidate) {
        throw new BadRequestException(`Роль ${updateUserDto.role} не найдена!`);
      }

      if (roleCandidate.variant === RoleVariant.Teacher) {
        userCandidate.course = null;
        userCandidate.group = null;
      }

      userCandidate.role = roleCandidate;
    }

    return this.usersRepository.save(userCandidate);
  }

  async removeUser(uid: string) {
    const userCandidate = await this.usersRepository.findOne({
      where: { uid },
    });

    if (!userCandidate) {
      throw new BadRequestException(`Пользователя с UID ${uid} не существует!`);
    }

    return this.usersRepository.remove(userCandidate);
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations: ['role', 'group', 'course'],
    });

    if (!users) {
      return new NotFoundException(`Пользователи не найдены!`);
    }

    return users;
  }

  async getAllUsersByGroupId(groupId: number) {
    const groupCandidate = await this.groupsService.getGroupById(groupId);

    if (!groupCandidate) {
      throw new BadRequestException(`Группа с id ${groupId} не найдена!`);
    }

    const users = await this.usersRepository.find({
      where: { group: groupCandidate },
      relations: ['role', 'group', 'course'],
    });

    if (!users) {
      return new NotFoundException(`Пользователи не найдены!`);
    }

    return users;
  }

  async getUserByUID(uid: string) {
    const user = await this.findUserByUID(uid);

    if (!user) {
      throw new NotFoundException(`Пользовать с UID ${uid} не найден.`);
    }

    return user;
  }

  async checkUserUID(uid: string) {
    const user = await this.findUserByUID(uid);

    if (!user) {
      return {
        mode: ManagementMode.CreateUser,
      };
    }

    return {
      mode: ManagementMode.UpdateUser,
      userInfo: {
        ...user,
        role: user?.role?.variant,
      },
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(`Пользовать с email ${email} не найден.`);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['role', 'group', 'course'],
    });
  }

  async findUserByUID(uid: string) {
    return await this.usersRepository.findOne({
      where: { uid },
      relations: ['role', 'group', 'course'],
    });
  }
}
