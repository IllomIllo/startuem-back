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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const jwt_refresh_token_strategy_1 = require("../auth/strategies/jwt.refresh-token.strategy");
const roles_types_1 = require("../roles/roles.types");
const roles_auth_decorator_1 = require("../roles/decorators/roles-auth.decorator");
const roles_guard_1 = require("../roles/guards/roles.guard");
const create_course_dto_1 = require("./dto/create-course.dto");
const jwt_access_token_auth_guard_1 = require("../auth/guards/jwt-access-token-auth.guard");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    getAllCourses() {
        return this.coursesService.getAllCourses();
    }
    getCourseByName(name) {
        return this.coursesService.getCourseByName(name);
    }
    getByCourseId(id) {
        return this.coursesService.getCourseById(id);
    }
    createCourse(dto) {
        return this.coursesService.createCourse(dto);
    }
    removeCourse(uid) {
        return this.coursesService.removeCourse(uid);
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
], CoursesController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)('/:name'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getCourseByName", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "getByCourseId", null);
__decorate([
    (0, common_1.Post)('/createCourse'),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "createCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('removeCourse/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "removeCourse", null);
CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map