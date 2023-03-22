"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const lesson_entity_1 = require("./entities/lesson.entity");
const courses_service_1 = require("../courses/courses.service");
const groups_service_1 = require("../groups/groups.service");
const subjects_service_1 = require("../subjects/subjects.service");
const users_service_1 = require("../users/users.service");
const roles_types_1 = require("../roles/roles.types");
const typeorm_2 = require("@nestjs/typeorm");
let LessonsService = class LessonsService {
    constructor(lessonsRepository, coursesService, groupsService, subjectsService, usersService) {
        this.lessonsRepository = lessonsRepository;
        this.coursesService = coursesService;
        this.groupsService = groupsService;
        this.subjectsService = subjectsService;
        this.usersService = usersService;
    }
    async getAllLessons() {
        return await this.lessonsRepository.find({
            relations: ['students', 'course', 'group', 'subject', 'teacher'],
        });
    }
    async getLessonById(id) {
        return await this.lessonsRepository.findOne({
            where: { id },
            relations: ['students', 'course', 'group', 'subject', 'teacher'],
        });
    }
    async createLesson(dto) {
        const teacherCandidate = await this.usersService.getUserByUID(dto.teacherUID);
        if (!teacherCandidate) {
            throw new common_1.BadRequestException(`Преподавателя с UID ${dto.teacherUID} не существует`);
        }
        const courseCandidate = await this.coursesService.getCourseById(dto.courseId);
        if (!courseCandidate) {
            throw new common_1.BadRequestException(`Курса с id ${dto.courseId} не существует`);
        }
        const groupCandidate = await this.groupsService.getGroupById(dto.groupId);
        if (!groupCandidate) {
            throw new common_1.BadRequestException(`Группы с id ${dto.groupId} не существует`);
        }
        const subjectCandidate = await this.subjectsService.getSubjectById(dto.subjectId);
        if (!subjectCandidate) {
            throw new common_1.BadRequestException(`Предмета с id ${dto.subjectId} не существует`);
        }
        const lesson = await this.lessonsRepository.create({});
        lesson.course = courseCandidate;
        lesson.group = groupCandidate;
        lesson.subject = subjectCandidate;
        lesson.teacher = teacherCandidate;
        lesson.students = [];
        return await this.lessonsRepository.save(lesson);
    }
    async addStudentToLesson(dto) {
        const lesson = await this.checkAndReturnLesson(dto.lessonId);
        const student = await this.checkAndReturnStudent(dto.studentUID);
        console.log(lesson);
        console.log(student);
        if (student.group.id !== lesson.group.id) {
            throw new common_1.BadRequestException(`Группы студента и занятия не совпадают`);
        }
        if (student.course.id !== lesson.course.id) {
            throw new common_1.BadRequestException(`Курсы студента и занятия не совпадают`);
        }
        if (student.role.variant !== roles_types_1.RoleVariant.Student) {
            throw new common_1.BadRequestException(`Пользователь с UID ${dto.studentUID} не является студентом`);
        }
        lesson.students = [...lesson.students, student];
        await this.lessonsRepository.save(lesson);
    }
    async removeStudentFromLesson(dto) {
        const lesson = await this.checkAndReturnLesson(dto.lessonId);
        const student = await this.checkAndReturnStudent(dto.studentUID);
        lesson.students = lesson.students.filter((currentStudent) => currentStudent.uid !== student.uid);
        await this.lessonsRepository.save(lesson);
    }
    async getAllLessonsWithFilters(dto) {
        const userCandidate = await this.usersService.getUserByUID(dto.studentUID);
        if (!userCandidate) {
            throw new common_1.BadRequestException(`Студента с UID ${dto.studentUID} не существует`);
        }
        let where = {
            course: userCandidate.course,
            group: userCandidate.group,
            students: {
                uid: userCandidate.uid,
            },
        };
        if (dto === null || dto === void 0 ? void 0 : dto.subjectId) {
            const subjectCandidate = await this.subjectsService.getSubjectById(dto.subjectId);
            if (!subjectCandidate) {
                throw new common_1.BadRequestException(`Предмета с id ${dto.subjectId} не существует`);
            }
            where = Object.assign(Object.assign({}, where), { subject: subjectCandidate });
        }
        if ((dto === null || dto === void 0 ? void 0 : dto.dateStart) && (dto === null || dto === void 0 ? void 0 : dto.dateEnd)) {
            where = Object.assign(Object.assign({}, where), { created_at: (0, typeorm_1.Between)(new Date(dto === null || dto === void 0 ? void 0 : dto.dateStart), new Date(dto === null || dto === void 0 ? void 0 : dto.dateEnd)) });
        }
        else if (dto === null || dto === void 0 ? void 0 : dto.dateStart) {
            where = Object.assign(Object.assign({}, where), { created_at: (0, typeorm_1.MoreThanOrEqual)(new Date(dto === null || dto === void 0 ? void 0 : dto.dateStart)) });
        }
        else if (dto === null || dto === void 0 ? void 0 : dto.dateEnd) {
            where = Object.assign(Object.assign({}, where), { created_at: (0, typeorm_1.LessThanOrEqual)(new Date(dto === null || dto === void 0 ? void 0 : dto.dateEnd)) });
        }
        return await this.lessonsRepository.find({
            where,
            relations: ['students', 'course', 'group', 'subject', 'teacher'],
        });
    }
    async checkAndReturnLesson(lessonId) {
        const lessonCandidate = await this.lessonsRepository.findOne({
            where: { id: lessonId },
            relations: ['students', 'course', 'group', 'subject', 'teacher'],
        });
        if (!lessonCandidate) {
            throw new common_1.BadRequestException(`Занятие с id ${lessonId} не существует`);
        }
        return lessonCandidate;
    }
    async checkAndReturnStudent(studentUID) {
        const studentCandidate = await this.usersService.findUserByUID(studentUID);
        if (!studentCandidate) {
            throw new common_1.BadRequestException(`Студент с UID ${studentUID} не существует`);
        }
        return studentCandidate;
    }
};
LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(lesson_entity_1.LessonEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        courses_service_1.CoursesService,
        groups_service_1.GroupsService,
        subjects_service_1.SubjectsService,
        users_service_1.UsersService])
], LessonsService);
exports.LessonsService = LessonsService;
//# sourceMappingURL=lessons.service.js.map