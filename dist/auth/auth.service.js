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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const auth_helpers_1 = require("./auth.helpers");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(user) {
        var _a, _b, _c, _d;
        const { accessToken, refreshToken } = await this.generateUserTokens(user);
        return {
            accessToken,
            refreshToken,
            user: {
                uid: user.uid,
                role: user.role.variant,
                fio: (_a = user === null || user === void 0 ? void 0 : user.fio) !== null && _a !== void 0 ? _a : '',
                email: (_b = user === null || user === void 0 ? void 0 : user.email) !== null && _b !== void 0 ? _b : '',
                group: (_c = user === null || user === void 0 ? void 0 : user.group) !== null && _c !== void 0 ? _c : '',
                course: (_d = user === null || user === void 0 ? void 0 : user.course) !== null && _d !== void 0 ? _d : '',
            },
        };
    }
    async register(dto) {
        if (!dto.uid) {
            throw new common_1.BadRequestException('Введите uid!');
        }
        const candidate = await this.usersService.findUserByEmail(dto.email);
        if (!!candidate) {
            throw new common_1.BadRequestException('Пользователь уже существует');
        }
        const hashedPassword = await auth_helpers_1.AuthHelpers.hashPassword(dto.password);
        return await this.usersService.createUser(Object.assign(Object.assign({}, dto), { password: hashedPassword }));
    }
    async validateToken(user) {
        var _a, _b, _c, _d, _e;
        try {
            if (!user) {
                throw new common_1.UnauthorizedException('Пользователь с таким токеном не найден, вы не авторизованы!');
            }
            const { accessToken, refreshToken } = await this.generateUserTokens(user);
            return {
                accessToken,
                refreshToken,
                user: {
                    uid: user.uid,
                    role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.variant,
                    fio: (_b = user === null || user === void 0 ? void 0 : user.fio) !== null && _b !== void 0 ? _b : '',
                    email: (_c = user === null || user === void 0 ? void 0 : user.email) !== null && _c !== void 0 ? _c : '',
                    group: (_d = user === null || user === void 0 ? void 0 : user.group) !== null && _d !== void 0 ? _d : '',
                    course: (_e = user === null || user === void 0 ? void 0 : user.course) !== null && _e !== void 0 ? _e : '',
                },
            };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Токен невалиден, вы не авторизованы!');
        }
    }
    async validateUser(loginUserDto) {
        const user = await this.usersService.findUserByEmail(loginUserDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException(`Пользователя с email ${loginUserDto.email} не существует`);
        }
        const isPasswordsMatch = await auth_helpers_1.AuthHelpers.comparePasswords(loginUserDto.password, user.password);
        if (!isPasswordsMatch) {
            throw new common_1.UnauthorizedException('Неправильный логин или пароль');
        }
        return user;
    }
    async generateUserTokens(user) {
        const payload = {
            email: user.email,
            sub: user.uid,
            role: user.role.variant,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
            }),
        ]);
        return { accessToken, refreshToken };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map