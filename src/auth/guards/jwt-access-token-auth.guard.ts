import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAccessTokenAuthGuard extends AuthGuard('jwt-access-token') {}
