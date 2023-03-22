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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_types_1 = require("./roles.types");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const typeorm_2 = require("@nestjs/typeorm");
let RolesService = class RolesService {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async getAllRoles() {
        return await this.rolesRepository.find();
    }
    async getRoleByVariant(variant) {
        if (!Object.values(roles_types_1.RoleVariant).includes(variant)) {
            throw new common_1.BadRequestException(`Роль ${variant} не существует`);
        }
        return await this.rolesRepository.findOne({ where: { variant } });
    }
    async getRoleById(id) {
        return await this.rolesRepository.findOne({ where: { id } });
    }
    async createRole(dto) {
        const role = await this.rolesRepository.create(dto);
        return await this.rolesRepository.save(role);
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map