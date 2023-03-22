import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.constants';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class LocalRolesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }
      const req: Request = context.switchToHttp().getRequest();

      const { email, password } = req.body;

      const user = await this.authService.validateUser({
        email,
        password,
      });
      req.user = user;
      return requiredRoles.includes(user?.role?.variant);
    } catch (e) {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
