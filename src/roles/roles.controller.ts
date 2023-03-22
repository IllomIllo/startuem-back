import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleVariant } from './roles.types';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtRefreshTokenStrategy } from '../auth/strategies/jwt.refresh-token.strategy';
import { Roles } from './decorators/roles-auth.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  /*@UseGuards(JwtRefreshTokenStrategy)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)*/
  @Get('/')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
  @Get('/:variant')
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getRoleByVariant(@Param('variant') variant: RoleVariant) {
    return this.roleService.getRoleByVariant(variant);
  }
  @Get('/:id')
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getByRoleId(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @Post('/createRole')
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
}
