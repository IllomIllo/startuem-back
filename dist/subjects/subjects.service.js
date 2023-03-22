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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const subject_entity_1 = require("./entities/subject.entity");
const groups_service_1 = require("../groups/groups.service");
const typeorm_2 = require("@nestjs/typeorm");
let SubjectsService = class SubjectsService {
    constructor(subjectsRepository, groupsService) {
        this.subjectsRepository = subjectsRepository;
        this.groupsService = groupsService;
    }
    async getAllSubjects() {
        return await this.subjectsRepository.find({
            relations: ['groups'],
        });
    }
    async getSubjectByName(name) {
        return await this.subjectsRepository.findOne({ where: { name } });
    }
    async getSubjectById(id) {
        return await this.subjectsRepository.findOne({ where: { id } });
    }
    async getAllSubjectsByGroupId(groupId) {
        const groupCandidate = await this.groupsService.getGroupById(groupId);
        if (!groupCandidate) {
            throw new common_1.BadRequestException(`Группы с id ${groupId} не существует!`);
        }
        return await this.subjectsRepository.find({
            relations: ['groups'],
            where: {
                groups: {
                    id: groupCandidate.id,
                },
            },
        });
    }
    async createSubject(dto) {
        const { groupsIds } = dto, restDto = __rest(dto, ["groupsIds"]);
        const subject = await this.subjectsRepository.create(restDto);
        if (groupsIds && groupsIds.length) {
            const groups = await Promise.all(groupsIds.map(async (id) => {
                const group = await this.groupsService.getGroupById(id);
                if (!group) {
                    throw new common_1.BadRequestException(`Группа с id ${id} не найдена!`);
                }
                return group;
            }));
            subject.groups = groups;
        }
        return this.subjectsRepository.save(subject);
    }
    async removeSubject(id) {
        const subjectCandidate = await this.subjectsRepository.findOne({
            where: { id },
        });
        if (!subjectCandidate) {
            throw new common_1.BadRequestException(`Предмета с id ${id} не существует!`);
        }
        return this.subjectsRepository.remove(subjectCandidate);
    }
};
SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(subject_entity_1.SubjectEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        groups_service_1.GroupsService])
], SubjectsService);
exports.SubjectsService = SubjectsService;
//# sourceMappingURL=subjects.service.js.map