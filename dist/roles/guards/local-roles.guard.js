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
exports.LocalRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_constants_1 = require("../roles.constants");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../../auth/auth.service");
let LocalRolesGuard = class LocalRolesGuard {
    constructor(authService, jwtService, configService, reflector) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a;
        try {
            const requiredRoles = this.reflector.getAllAndOverride(roles_constants_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const { email, password } = req.body;
            const user = await this.authService.validateUser({
                email,
                password,
            });
            req.user = user;
            return requiredRoles.includes((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.variant);
        }
        catch (e) {
            throw new common_1.HttpException('Нет доступа', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
LocalRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService,
        config_1.ConfigService,
        core_1.Reflector])
], LocalRolesGuard);
exports.LocalRolesGuard = LocalRolesGuard;
//# sourceMappingURL=local-roles.guard.js.map