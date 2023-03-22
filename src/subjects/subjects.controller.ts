import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { JwtRefreshTokenStrategy } from '../auth/strategies/jwt.refresh-token.strategy';
import { RoleVariant } from '../roles/roles.types';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @UseGuards(JwtRefreshTokenStrategy)
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('/')
  getAllSubjects() {
    return this.subjectsService.getAllSubjects();
  }
  @Get('/:name')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getSubjectByVariant(@Param('name') name: string) {
    return this.subjectsService.getSubjectByName(name);
  }
  @Get('/:id')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getByGroupId(@Param('id') id: number) {
    return this.subjectsService.getSubjectById(id);
  }

  @Get('/getAllSubjectsByGroupId/:id')
  @Roles(
    RoleVariant.Student,
    RoleVariant.Teacher,
    RoleVariant.Admin,
    RoleVariant.SuperAdmin,
  )
  @UseGuards(RolesGuard)
  getSubjectsByCourseId(@Param('id') id: number) {
    return this.subjectsService.getAllSubjectsByGroupId(id);
  }

  @Post('/createSubject')
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.createSubject(dto);
  }

  @Delete('/removeSubject/:id')
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  removeSubject(@Param('id') id: number) {
    return this.subjectsService.removeSubject(id);
  }
}
