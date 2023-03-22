import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthHelpers } from '../auth.helpers';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AuthHelpers.extractJwtRefreshTokenFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  public async validate(payload: JwtPayloadDto): Promise<UserEntity> {
    try {
      return await this.usersService.findUserByUID(payload.sub);
    } catch (err) {
      throw new UnauthorizedException(
        'Пользователь с таким токеном не найден. Вы не авторизованы.',
      );
    }
  }
}
