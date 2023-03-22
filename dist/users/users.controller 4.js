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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create.user.dto");
const jwt_access_token_auth_guard_1 = require("../auth/guards/jwt-access-token-auth.guard");
const roles_auth_decorator_1 = require("../roles/decorators/roles-auth.decorator");
const roles_types_1 = require("../roles/roles.types");
const roles_guard_1 = require("../roles/guards/roles.guard");
const update_user_dto_1 = require("./dto/update.user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    getAllUsersByGroupId(groupId) {
        return this.usersService.getAllUsersByGroupId(groupId);
    }
    getUserByEmail(login) {
        return this.usersService.getUserByEmail(login);
    }
    getUserByUID(uid) {
        return this.usersService.getUserByUID(uid);
    }
    checkUserUID(uid) {
        return this.usersService.checkUserUID(uid);
    }
    updateUser(updateUserDto, uid) {
        return this.usersService.updateUser(uid, updateUserDto);
    }
    removeUser(uid) {
        return this.usersService.removeUser(uid);
    }
};
__decorate([
    (0, common_1.Post)('createUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('getAllUsersByGroupId/:groupId'),
    __param(0, (0, common_1.Param)('groupId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUsersByGroupId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('getUserByEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Teacher, roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('getUserByUID/:uid'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserByUID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('checkUserUID/:uid'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "checkUserUID", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.Admin, roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Put)('updateUser/:uid'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_token_auth_guard_1.JwtAccessTokenAuthGuard),
    (0, roles_auth_decorator_1.Roles)(roles_types_1.RoleVariant.SuperAdmin),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Delete)('removeUser/:uid'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map