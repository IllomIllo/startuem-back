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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
const groups_service_1 = require("../groups/groups.service");
const typeorm_2 = require("@nestjs/typeorm");
let CoursesService = class CoursesService {
    constructor(coursesRepository, groupsService) {
        this.coursesRepository = coursesRepository;
        this.groupsService = groupsService;
    }
    async getAllCourses() {
        return await this.coursesRepository.find({
            relations: ['groups'],
        });
    }
    async getCourseByName(name) {
        return await this.coursesRepository.findOne({ where: { name } });
    }
    async getCourseById(id) {
        return await this.coursesRepository.findOne({
            where: { id },
            relations: ['groups'],
        });
    }
    async createCourse(dto) {
        let groups = [];
        if (dto.groupIds && dto.groupIds.length > 0) {
            const groupIds = dto.groupIds;
            groups = await Promise.all(groupIds.map(this.checkAndReturnGroupById));
        }
        const course = await this.coursesRepository.create(dto);
        course.groups = groups;
        return await this.coursesRepository.save(course);
    }
    async removeCourse(id) {
        const courseCandidate = await this.coursesRepository.findOne({
            where: { id },
        });
        if (!courseCandidate) {
            throw new common_1.BadRequestException(`Курса с id ${id} не существует!`);
        }
        return this.coursesRepository.remove(courseCandidate);
    }
    async checkAndReturnGroupById(id) {
        const groupCandidate = await this.groupsService.getGroupById(id);
        if (!groupCandidate) {
            throw new common_1.BadRequestException(`Группы c id ${id} не существует!`);
        }
        return groupCandidate;
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(course_entity_1.CourseEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => groups_service_1.GroupsService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        groups_service_1.GroupsService])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map