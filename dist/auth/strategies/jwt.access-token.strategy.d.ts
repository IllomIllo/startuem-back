import { Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
declare const JwtAccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessTokenStrategy extends JwtAccessTokenStrategy_base {
    private readonly configService;
    private readonly userService;
    constructor(configService: ConfigService, userService: UsersService);
    validate(payload: JwtPayloadDto): Promise<UserEntity>;
}
export {};
