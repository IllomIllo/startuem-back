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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../roles/entities/role.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        primary: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "fio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, (role) => role.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", role_entity_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.CourseEntity, (course) => course.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", course_entity_1.CourseEntity)
], UserEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupEntity, (group) => group.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", group_entity_1.GroupEntity)
], UserEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => lesson_entity_1.LessonEntity, (lesson) => lesson.students),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "lessons", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map