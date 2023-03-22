import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { AuthHelpers } from "./auth.helpers";
import { LoginUserDto } from "./dto/login.user.dto";
import { UserEntity } from "../users/entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { UserJwtPayload } from "./auth.types";
import { RegisterUserDto } from "./dto/register.user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(user: UserEntity) {
    const { accessToken, refreshToken } = await this.generateUserTokens(user);

    return {
      accessToken,
      refreshToken,
      user: {
        uid: user.uid,
        role: user.role.variant,
        fio: user?.fio ?? '',
        email: user?.email ?? '',
        group: user?.group ?? '',
        course: user?.course ?? '',
      },
    };
  }

  public async register(dto: RegisterUserDto) {
    if (!dto.uid) {
      throw new BadRequestException('Введите uid!');
    }
    const candidate = await this.usersService.findUserByEmail(dto.email);
    if (!!candidate) {
      throw new BadRequestException('Пользователь уже существует');
    }
    const hashedPassword = await AuthHelpers.hashPassword(dto.password);
    return await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
  }

  public async validateToken(user: UserEntity) {
    try {
      if (!user) {
        throw new UnauthorizedException(
          'Пользователь с таким токеном не найден, вы не авторизованы!',
        );
      }

      const { accessToken, refreshToken } = await this.generateUserTokens(user);

      return {
        accessToken,
        refreshToken,
        user: {
          uid: user.uid,
          role: user.role?.variant,
          fio: user?.fio ?? '',
          email: user?.email ?? '',
          group: user?.group ?? '',
          course: user?.course ?? '',
        },
      };
    } catch (err) {
      throw new UnauthorizedException('Токен невалиден, вы не авторизованы!');
    }
  }

  public async validateUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.usersService.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException(
        `Пользователя с email ${loginUserDto.email} не существует`,
      );
    }
    const isPasswordsMatch = await AuthHelpers.comparePasswords(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordsMatch) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }
    return user;
  }

  private async generateUserTokens(user: UserEntity) {
    const payload: UserJwtPayload = {
      email: user.email,
      sub: user.uid,
      role: user.role.variant,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
