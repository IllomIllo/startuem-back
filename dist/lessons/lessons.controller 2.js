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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const lessons_service_1 = require("./lessons.service");
const jwt_refresh_token_strategy_1 = require("../auth/strategies/jwt.refresh-token.strategy");
const roles_types_1 = require("../roles/roles.types");
const roles_auth_decorator_1 = require("../roles/decorators/roles-auth.decorator");
const roles_guard_1 = require("../roles/guards/roles.guard");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
const add_student_to_lesson_dto_1 = require("./dto/add-student-to-lesson.dto");
const remove_student_from_lesson_dto_1 = require("./dto/remove-student-from-lesson.dto");
const get_all_lessons_with_filters_dto_1 = require("./dto/get-all-lessons-with-filters.dto");
let LessonsController = class LessonsController {
    constructor(lessonsService) {
        this.lessonsService = lessonsService;
    }
    getAllGroups() {
        return this.lessonsService.getAllLessons();
    }
    getByGroupId(id) {
        return this.lessonsService.getLessonById(id);
    }
    createLesson(dto) {
        return this.lessonsService.createLesson(dto);
    }
    async addStudentToLesson(dto) {
        await this.lessonsService.addStudentToLesson(dto);
        return await this.lessonsService.getLessonById(dto.lessonId);
    }
    async removeStudentFromLesson(dto) {
        await this.lessonsService.removeStudentFromLesson(dto);
        return await this.lessonsService.getLessonById(dto.lessonId);
    }
    getAllLessonsWithFilters(dto) {
        return this.lessonsService.getAllLessonsWithFilters(dto);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_refresh_token_strategy_1.JwtRefreshTokenStrategy),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "getAllGroups", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "getByGroupId", null);
__decorate([
    (0, common_1.Post)('/createLesson'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Put)('/addStudentToLesson'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_student_to_lesson_dto_1.AddStudentToLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "addStudentToLesson", null);
__decorate([
    (0, common_1.Put)('/removeStudentFromLesson'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_student_from_lesson_dto_1.RemoveStudentFromLessonDto]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "removeStudentFromLesson", null);
__decorate([
    (0, common_1.Post)('/getAllLessonsWithFilters'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Student, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_lessons_with_filters_dto_1.GetAllLessonsWithFiltersDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "getAllLessonsWithFilters", null);
LessonsController = __decorate([
    (0, common_1.Controller)('lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
exports.LessonsController = LessonsController;
//# sourceMappingURL=lessons.controller.js.map