import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { JwtRefreshTokenStrategy } from '../auth/strategies/jwt.refresh-token.strategy';
import { RoleVariant } from '../roles/roles.types';
import { Roles } from '../roles/decorators/roles-auth.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { AddStudentToLessonDto } from './dto/add-student-to-lesson.dto';
import { RemoveStudentFromLessonDto } from './dto/remove-student-from-lesson.dto';
import { GetAllLessonsWithFiltersDto } from "./dto/get-all-lessons-with-filters.dto";

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @UseGuards(JwtRefreshTokenStrategy)
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  @Get('/')
  getAllGroups() {
    return this.lessonsService.getAllLessons();
  }

  @Get('/:id')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getByGroupId(@Param('id') id: number) {
    return this.lessonsService.getLessonById(id);
  }

  @Post('/createLesson')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonsService.createLesson(dto);
  }

  @Put('/addStudentToLesson')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  async addStudentToLesson(@Body() dto: AddStudentToLessonDto) {
    await this.lessonsService.addStudentToLesson(dto);
    return await this.lessonsService.getLessonById(dto.lessonId);
  }

  @Put('/removeStudentFromLesson')
  @Roles(RoleVariant.Teacher, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  async removeStudentFromLesson(@Body() dto: RemoveStudentFromLessonDto) {
    await this.lessonsService.removeStudentFromLesson(dto);
    return await this.lessonsService.getLessonById(dto.lessonId);
  }

  @Post('/getAllLessonsWithFilters')
  @Roles(RoleVariant.Student, RoleVariant.Admin, RoleVariant.SuperAdmin)
  @UseGuards(RolesGuard)
  getAllLessonsWithFilters(@Body() dto: GetAllLessonsWithFiltersDto) {
    return this.lessonsService.getAllLessonsWithFilters(dto);
  }
}
