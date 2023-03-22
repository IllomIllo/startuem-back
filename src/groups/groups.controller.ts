import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtRefreshTokenStrategy } from '../auth/strategies/jwt.refresh-token.strategy';
import { RoleVariant } from '../roles/roles.types';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAccessTokenStrategy } from '../auth/strategies/jwt.access-token.strategy';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @UseGuards(JwtRefreshTokenStrategy)
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('/')
  getAllGroups() {
    return this.groupsService.getAllGroups();
  }
  @Get('/:name')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getGroupByName(@Param('name') name: string) {
    return this.groupsService.getGroupByName(name);
  }
  @Get('/:id')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getByGroupId(@Param('id') id: number) {
    return this.groupsService.getGroupById(id);
  }

  @Get('/getAllGroupsByCourseId/:id')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getByCourseId(@Param('id') id: number) {
    return this.groupsService.getAllGroupsByCourseId(id);
  }

  @Post('/createGroup')
  @UseGuards(JwtAccessTokenStrategy)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  createGroup(@Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(dto);
  }
}
