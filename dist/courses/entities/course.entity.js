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
exports.CourseEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
const lesson_entity_1 = require("../../lessons/entities/lesson.entity");
let CourseEntity = class CourseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (user) => user.course),
    __metadata("design:type", Array)
], CourseEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => group_entity_1.GroupEntity, (group) => group.course),
    __metadata("design:type", Array)
], CourseEntity.prototype, "groups", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.LessonEntity, (lessons) => lessons.course),
    __metadata("design:type", Array)
], CourseEntity.prototype, "lessons", void 0);
CourseEntity = __decorate([
    (0, typeorm_1.Entity)()
], CourseEntity);
exports.CourseEntity = CourseEntity;
//# sourceMappingURL=course.entity.js.map