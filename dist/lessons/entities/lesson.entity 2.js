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
exports.LessonEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const course_entity_1 = require("../../courses/entities/course.entity");
const subject_entity_1 = require("../../subjects/entities/subject.entity");
const group_entity_1 = require("../../groups/entities/group.entity");
let LessonEntity = class LessonEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LessonEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (student) => student.lessons),
    __metadata("design:type", Array)
], LessonEntity.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.CourseEntity),
    __metadata("design:type", course_entity_1.CourseEntity)
], LessonEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.GroupEntity),
    __metadata("design:type", group_entity_1.GroupEntity)
], LessonEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subject_entity_1.SubjectEntity),
    __metadata("design:type", subject_entity_1.SubjectEntity)
], LessonEntity.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], LessonEntity.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], LessonEntity.prototype, "created_at", void 0);
LessonEntity = __decorate([
    (0, typeorm_1.Entity)()
], LessonEntity);
exports.LessonEntity = LessonEntity;
//# sourceMappingURL=lesson.entity.js.map