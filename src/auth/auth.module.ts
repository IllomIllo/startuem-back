import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAccessTokenStrategy } from './strategies/jwt.access-token.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, JwtAccessTokenStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
