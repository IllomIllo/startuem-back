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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const group_entity_1 = require("./entities/group.entity");
const courses_service_1 = require("../courses/courses.service");
const typeorm_2 = require("@nestjs/typeorm");
let GroupsService = class GroupsService {
    constructor(groupsRepository, coursesService) {
        this.groupsRepository = groupsRepository;
        this.coursesService = coursesService;
    }
    async getAllGroups() {
        return await this.groupsRepository.find({
            relations: ['course'],
        });
    }
    async getGroupByName(name) {
        return await this.groupsRepository.findOne({ where: { name } });
    }
    async getGroupById(id) {
        return await this.groupsRepository.findOne({ where: { id } });
    }
    async getAllGroupsByCourseId(courseId) {
        const courseCandidate = await this.coursesService.getCourseById(courseId);
        if (!courseCandidate) {
            throw new common_1.BadRequestException(`Курса с id ${courseId} не существует!`);
        }
        return await this.groupsRepository.find({
            where: { course: courseCandidate },
            relations: ['course'],
        });
    }
    async createGroup(dto) {
        const courseCandidate = await this.coursesService.getCourseById(dto.courseId);
        if (!courseCandidate) {
            throw new common_1.BadRequestException(`Курса с id ${dto.courseId} не существует!`);
        }
        const group = await this.groupsRepository.create(dto);
        group.course = courseCandidate;
        return this.groupsRepository.save(group);
    }
};
GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(group_entity_1.GroupEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => courses_service_1.CoursesService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        courses_service_1.CoursesService])
], GroupsService);
exports.GroupsService = GroupsService;
//# sourceMappingURL=groups.service.js.map