import { Request } from 'express';
export declare class AuthHelpers {
    static comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    static hashPassword(password: string): Promise<string>;
    static extractJwtRefreshTokenFromCookies(req: Request): string | null;
}
