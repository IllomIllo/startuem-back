import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtRefreshTokenStrategy } from '../auth/strategies/jwt.refresh-token.strategy';
import { RoleVariant } from '../roles/roles.types';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAccessTokenAuthGuard } from '../auth/guards/jwt-access-token-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(JwtRefreshTokenStrategy)
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('/')
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }
  @Get('/:name')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getCourseByName(@Param('name') name: string) {
    return this.coursesService.getCourseByName(name);
  }
  @Get('/:id')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getByCourseId(@Param('id') id: number) {
    return this.coursesService.getCourseById(id);
  }

  @Post('/createCourse')
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  createCourse(@Body() dto: CreateCourseDto) {
    return this.coursesService.createCourse(dto);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Roles(RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Delete('removeCourse/:id')
  removeCourse(@Param('id') uid) {
    return this.coursesService.removeCourse(uid);
  }
}
