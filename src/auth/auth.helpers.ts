import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { REFRESH_JWT_TOKEN_COOKIE_KEY } from '../constants';

export class AuthHelpers {
  static async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = 5;
    return await bcrypt.hash(password, salt);
  }

  static extractJwtRefreshTokenFromCookies(req: Request): string | null {
    if (
      req.cookies &&
      REFRESH_JWT_TOKEN_COOKIE_KEY in req.cookies &&
      req.cookies[REFRESH_JWT_TOKEN_COOKIE_KEY].length > 0
    ) {
      return req.cookies[REFRESH_JWT_TOKEN_COOKIE_KEY];
    }
    return null;
  }
}
