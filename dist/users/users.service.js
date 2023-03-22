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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const roles_service_1 = require("../roles/roles.service");
const courses_service_1 = require("../courses/courses.service");
const groups_service_1 = require("../groups/groups.service");
const typeorm_2 = require("@nestjs/typeorm");
const auth_helpers_1 = require("../auth/auth.helpers");
const roles_types_1 = require("../roles/roles.types");
const users_types_1 = require("./users.types");
let UsersService = class UsersService {
    constructor(usersRepository, rolesService, coursesService, groupsService) {
        this.usersRepository = usersRepository;
        this.rolesService = rolesService;
        this.coursesService = coursesService;
        this.groupsService = groupsService;
    }
    async createUser(createUserDto) {
        var _a, _b, _c;
        const email = createUserDto.email;
        const userWithCurrentLogin = await this.findUserByEmail(email);
        if (userWithCurrentLogin) {
            throw new common_1.BadRequestException(`Пользовать с email ${email} уже существует. Введите другой email и попробуйте снова.`);
        }
        const roleCandidate = await this.rolesService.getRoleByVariant(createUserDto.role);
        if (!roleCandidate) {
            throw new common_1.BadRequestException(`Роли ${createUserDto.role} не существует. Введите другую роль.`);
        }
        const user = await this.usersRepository.create({
            uid: createUserDto.uid,
            email: createUserDto.email,
            password: createUserDto.password,
            fio: createUserDto.fio,
        });
        if (createUserDto.courseId) {
            const courseCandidate = await this.coursesService.getCourseById(createUserDto.courseId);
            if (!courseCandidate) {
                throw new common_1.BadRequestException(`Курс с id ${createUserDto.courseId} не найден!`);
            }
            user.course = courseCandidate;
        }
        if (createUserDto.groupId) {
            const groupCandidate = await this.groupsService.getGroupById(createUserDto.groupId);
            if (!groupCandidate) {
                throw new common_1.BadRequestException(`Группа с id ${createUserDto.groupId} не найдена!`);
            }
            if (!((_b = (_a = user === null || user === void 0 ? void 0 : user.course) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.find((group) => (group === null || group === void 0 ? void 0 : group.id) === groupCandidate.id))) {
                throw new common_1.BadRequestException(`Курс с id ${(_c = user === null || user === void 0 ? void 0 : user.course) === null || _c === void 0 ? void 0 : _c.id} не содержит группу с id ${groupCandidate.id}`);
            }
            user.group = groupCandidate;
        }
        user.role = roleCandidate;
        return this.usersRepository.save(user);
    }
    async updateUser(currentUID, updateUserDto) {
        var _a, _b, _c;
        const userCandidate = await this.usersRepository.findOne({
            where: { uid: currentUID },
        });
        if (!userCandidate) {
            throw new common_1.BadRequestException(`Пользователь с UID ${currentUID} не найден!`);
        }
        if (updateUserDto.uid) {
            userCandidate.uid = updateUserDto.uid;
        }
        if (updateUserDto.email) {
            userCandidate.email = updateUserDto.email;
        }
        if (updateUserDto.fio) {
            userCandidate.fio = updateUserDto.fio;
        }
        if (updateUserDto.courseId) {
            const courseCandidate = await this.coursesService.getCourseById(updateUserDto.courseId);
            if (!courseCandidate) {
                throw new common_1.BadRequestException(`Курс с id ${updateUserDto.courseId} не найден!`);
            }
            userCandidate.course = courseCandidate;
        }
        if (updateUserDto.groupId) {
            const groupCandidate = await this.groupsService.getGroupById(updateUserDto.groupId);
            if (!groupCandidate) {
                throw new common_1.BadRequestException(`Группа с id ${updateUserDto.groupId} не найдена!`);
            }
            if (!((_b = (_a = userCandidate === null || userCandidate === void 0 ? void 0 : userCandidate.course) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.find((group) => (group === null || group === void 0 ? void 0 : group.id) === groupCandidate.id))) {
                throw new common_1.BadRequestException(`Курс с id ${(_c = userCandidate === null || userCandidate === void 0 ? void 0 : userCandidate.course) === null || _c === void 0 ? void 0 : _c.id} не содержит группу с id ${groupCandidate.id}`);
            }
            userCandidate.group = groupCandidate;
        }
        if (updateUserDto.password) {
            userCandidate.password = await auth_helpers_1.AuthHelpers.hashPassword(updateUserDto.password);
        }
        if (updateUserDto.role) {
            const roleCandidate = await this.rolesService.getRoleByVariant(updateUserDto.role);
            if (!roleCandidate) {
                throw new common_1.BadRequestException(`Роль ${updateUserDto.role} не найдена!`);
            }
            if (roleCandidate.variant === roles_types_1.RoleVariant.Teacher) {
                userCandidate.course = null;
                userCandidate.group = null;
            }
            userCandidate.role = roleCandidate;
        }
        return this.usersRepository.save(userCandidate);
    }
    async removeUser(uid) {
        const userCandidate = await this.usersRepository.findOne({
            where: { uid },
        });
        if (!userCandidate) {
            throw new common_1.BadRequestException(`Пользователя с UID ${uid} не существует!`);
        }
        return this.usersRepository.remove(userCandidate);
    }
    async getAllUsers() {
        const users = await this.usersRepository.find({
            relations: ['role', 'group', 'course'],
        });
        if (!users) {
            return new common_1.NotFoundException(`Пользователи не найдены!`);
        }
        return users;
    }
    async getAllUsersByGroupId(groupId) {
        const groupCandidate = await this.groupsService.getGroupById(groupId);
        if (!groupCandidate) {
            throw new common_1.BadRequestException(`Группа с id ${groupId} не найдена!`);
        }
        const users = await this.usersRepository.find({
            where: { group: groupCandidate },
            relations: ['role', 'group', 'course'],
        });
        if (!users) {
            return new common_1.NotFoundException(`Пользователи не найдены!`);
        }
        return users;
    }
    async getUserByUID(uid) {
        const user = await this.findUserByUID(uid);
        if (!user) {
            throw new common_1.NotFoundException(`Пользовать с UID ${uid} не найден.`);
        }
        return user;
    }
    async checkUserUID(uid) {
        var _a;
        const user = await this.findUserByUID(uid);
        if (!user) {
            return {
                mode: users_types_1.ManagementMode.CreateUser,
            };
        }
        return {
            mode: users_types_1.ManagementMode.UpdateUser,
            userInfo: Object.assign(Object.assign({}, user), { role: (_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.variant }),
        };
    }
    async getUserByEmail(email) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`Пользовать с email ${email} не найден.`);
        }
        return user;
    }
    async findUserByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['role', 'group', 'course'],
        });
    }
    async findUserByUID(uid) {
        return await this.usersRepository.findOne({
            where: { uid },
            relations: ['role', 'group', 'course'],
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        roles_service_1.RolesService,
        courses_service_1.CoursesService,
        groups_service_1.GroupsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map