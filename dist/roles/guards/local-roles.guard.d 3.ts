import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
export declare class LocalRolesGuard implements CanActivate {
    private authService;
    private jwtService;
    private configService;
    private reflector;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
