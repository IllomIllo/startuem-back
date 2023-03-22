import { Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly configService;
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: JwtPayloadDto): Promise<UserEntity>;
}
export {};
