"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsModule = void 0;
const common_1 = require("@nestjs/common");
const lessons_service_1 = require("./lessons.service");
const lessons_controller_1 = require("./lessons.controller");
const typeorm_1 = require("@nestjs/typeorm");
const lesson_entity_1 = require("./entities/lesson.entity");
const groups_module_1 = require("../groups/groups.module");
const subjects_module_1 = require("../subjects/subjects.module");
const users_module_1 = require("../users/users.module");
const courses_module_1 = require("../courses/courses.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let LessonsModule = class LessonsModule {
};
LessonsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([lesson_entity_1.LessonEntity]),
            courses_module_1.CoursesModule,
            groups_module_1.GroupsModule,
            subjects_module_1.SubjectsModule,
            jwt_1.JwtModule,
            config_1.ConfigModule,
            users_module_1.UsersModule,
        ],
        providers: [lessons_service_1.LessonsService],
        controllers: [lessons_controller_1.LessonsController],
        exports: [lessons_service_1.LessonsService],
    })
], LessonsModule);
exports.LessonsModule = LessonsModule;
//# sourceMappingURL=lessons.module.js.map