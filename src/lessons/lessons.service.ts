import { BadRequestException, Injectable } from '@nestjs/common';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CoursesService } from '../courses/courses.service';
import { GroupsService } from '../groups/groups.service';
import { SubjectsService } from '../subjects/subjects.service';
import { UsersService } from '../users/users.service';
import { AddStudentToLessonDto } from './dto/add-student-to-lesson.dto';
import { RoleVariant } from '../roles/roles.types';
import { RemoveStudentFromLessonDto } from './dto/remove-student-from-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllLessonsWithFiltersDto } from './dto/get-all-lessons-with-filters.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonsRepository: Repository<LessonEntity>,
    private coursesService: CoursesService,
    private groupsService: GroupsService,
    private subjectsService: SubjectsService,
    private usersService: UsersService,
  ) {}

  async getAllLessons() {
    return await this.lessonsRepository.find({
      relations: ['students', 'course', 'group', 'subject', 'teacher'],
    });
  }

  async getLessonById(id: number) {
    return await this.lessonsRepository.findOne({
      where: { id },
      relations: ['students', 'course', 'group', 'subject', 'teacher'],
    });
  }

  async createLesson(dto: CreateLessonDto) {
    const teacherCandidate = await this.usersService.getUserByUID(
      dto.teacherUID,
    );

    if (!teacherCandidate) {
      throw new BadRequestException(
        `Преподавателя с UID ${dto.teacherUID} не существует`,
      );
    }

    const courseCandidate = await this.coursesService.getCourseById(
      dto.courseId,
    );

    if (!courseCandidate) {
      throw new BadRequestException(`Курса с id ${dto.courseId} не существует`);
    }

    const groupCandidate = await this.groupsService.getGroupById(dto.groupId);

    if (!groupCandidate) {
      throw new BadRequestException(`Группы с id ${dto.groupId} не существует`);
    }

    const subjectCandidate = await this.subjectsService.getSubjectById(
      dto.subjectId,
    );

    if (!subjectCandidate) {
      throw new BadRequestException(
        `Предмета с id ${dto.subjectId} не существует`,
      );
    }

    const lesson = await this.lessonsRepository.create({});

    lesson.course = courseCandidate;
    lesson.group = groupCandidate;
    lesson.subject = subjectCandidate;
    lesson.teacher = teacherCandidate;
    lesson.students = [];

    return await this.lessonsRepository.save(lesson);
  }

  async addStudentToLesson(dto: AddStudentToLessonDto) {
    const lesson = await this.checkAndReturnLesson(dto.lessonId);
    const student = await this.checkAndReturnStudent(dto.studentUID);

    console.log(lesson);
    console.log(student);

    if (student.group.id !== lesson.group.id) {
      throw new BadRequestException(`Группы студента и занятия не совпадают`);
    }

    if (student.course.id !== lesson.course.id) {
      throw new BadRequestException(`Курсы студента и занятия не совпадают`);
    }

    if (student.role.variant !== RoleVariant.Student) {
      throw new BadRequestException(
        `Пользователь с UID ${dto.studentUID} не является студентом`,
      );
    }

    lesson.students = [...lesson.students, student];

    await this.lessonsRepository.save(lesson);
  }

  async removeStudentFromLesson(dto: RemoveStudentFromLessonDto) {
    const lesson = await this.checkAndReturnLesson(dto.lessonId);
    const student = await this.checkAndReturnStudent(dto.studentUID);

    lesson.students = lesson.students.filter(
      (currentStudent) => currentStudent.uid !== student.uid,
    );

    await this.lessonsRepository.save(lesson);
  }

  async getAllLessonsWithFilters(dto: GetAllLessonsWithFiltersDto) {
    const userCandidate = await this.usersService.getUserByUID(dto.studentUID);

    if (!userCandidate) {
      throw new BadRequestException(
        `Студента с UID ${dto.studentUID} не существует`,
      );
    }

    let where: FindOptionsWhere<LessonEntity> = {
      course: userCandidate.course,
      group: userCandidate.group,
      students: {
        uid: userCandidate.uid,
      },
    };

    if (dto?.subjectId) {
      const subjectCandidate = await this.subjectsService.getSubjectById(
        dto.subjectId,
      );

      if (!subjectCandidate) {
        throw new BadRequestException(
          `Предмета с id ${dto.subjectId} не существует`,
        );
      }

      where = {
        ...where,
        subject: subjectCandidate,
      };
    }

    if (dto?.dateStart && dto?.dateEnd) {
      where = {
        ...where,
        created_at: Between(new Date(dto?.dateStart), new Date(dto?.dateEnd)),
      };
    } else if (dto?.dateStart) {
      where = {
        ...where,
        created_at: MoreThanOrEqual(new Date(dto?.dateStart)),
      };
    } else if (dto?.dateEnd) {
      where = {
        ...where,
        created_at: LessThanOrEqual(new Date(dto?.dateEnd)),
      };
    }

    return await this.lessonsRepository.find({
      where,
      relations: ['students', 'course', 'group', 'subject', 'teacher'],
    });
  }

  private async checkAndReturnLesson(lessonId: number) {
    const lessonCandidate = await this.lessonsRepository.findOne({
      where: { id: lessonId },
      relations: ['students', 'course', 'group', 'subject', 'teacher'],
    });

    if (!lessonCandidate) {
      throw new BadRequestException(`Занятие с id ${lessonId} не существует`);
    }

    return lessonCandidate;
  }

  private async checkAndReturnStudent(studentUID: string) {
    const studentCandidate = await this.usersService.findUserByUID(studentUID);

    if (!studentCandidate) {
      throw new BadRequestException(
        `Студент с UID ${studentUID} не существует`,
      );
    }

    return studentCandidate;
  }
}
