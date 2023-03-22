import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessTokenAuthGuard } from './guards/jwt-access-token-auth.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-token-auth.guard';
import { RegisterUserDto } from './dto/register.user.dto';
import { Response } from 'express';
import { REFRESH_JWT_TOKEN_COOKIE_KEY } from '../constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const { refreshToken, ...restResult } = await this.authService.login(
      req.user,
    );
    res.cookie(REFRESH_JWT_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
    });
    res.json(restResult);
    res.send();
    res.end();
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAccessTokenAuthGuard)
  @Get('validateToken')
  validateToken(@Request() req) {
    return this.authService.validateToken(req.user);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Get('refreshToken')
  refreshToken(@Request() req) {
    return this.authService.validateToken(req.user);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie(REFRESH_JWT_TOKEN_COOKIE_KEY);
    res.json({ result: 'ok' }).send().end();
  }
}
