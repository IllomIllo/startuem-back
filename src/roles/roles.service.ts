import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleVariant } from './roles.types';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async getAllRoles() {
    return await this.rolesRepository.find();
  }

  async getRoleByVariant(variant: RoleVariant) {
    if (!Object.values(RoleVariant).includes(variant)) {
      throw new BadRequestException(`Роль ${variant} не существует`);
    }
    return await this.rolesRepository.findOne({ where: { variant } });
  }

  async getRoleById(id: number) {
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.create(dto);
    return await this.rolesRepository.save(role);
  }
}
