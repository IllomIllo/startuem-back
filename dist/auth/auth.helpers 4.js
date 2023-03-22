"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelpers = void 0;
const bcrypt = require("bcrypt");
const constants_1 = require("../constants");
class AuthHelpers {
    static async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static async hashPassword(password) {
        const salt = 5;
        return await bcrypt.hash(password, salt);
    }
    static extractJwtRefreshTokenFromCookies(req) {
        if (req.cookies &&
            constants_1.REFRESH_JWT_TOKEN_COOKIE_KEY in req.cookies &&
            req.cookies[constants_1.REFRESH_JWT_TOKEN_COOKIE_KEY].length > 0) {
            return req.cookies[constants_1.REFRESH_JWT_TOKEN_COOKIE_KEY];
        }
        return null;
    }
}
exports.AuthHelpers = AuthHelpers;
//# sourceMappingURL=auth.helpers.js.map