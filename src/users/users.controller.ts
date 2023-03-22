import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-access-token-auth.guard';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RoleVariant } from '../roles/roles.types';
import { RolesGuard } from '../roles/guards/roles.guard';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /*@UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)*/
  @Post('createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /*@UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)*/
  @Get('/')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('getAllUsersByGroupId/:groupId')
  getAllUsersByGroupId(@Param('groupId') groupId: number) {
    return this.usersService.getAllUsersByGroupId(groupId);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('getUserByEmail/:email')
  getUserByEmail(@Param('email') login: string) {
    return this.usersService.getUserByEmail(login);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('getUserByUID/:uid')
  getUserByUID(@Param('uid') uid: string) {
    return this.usersService.getUserByUID(uid);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('checkUserUID/:uid')
  checkUserUID(@Param('uid') uid: string) {
    return this.usersService.checkUserUID(uid);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Put('updateUser/:uid')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('uid') uid) {
    return this.usersService.updateUser(uid, updateUserDto);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Delete('removeUser/:uid')
  removeUser(@Param('uid') uid) {
    return this.usersService.removeUser(uid);
  }
}
