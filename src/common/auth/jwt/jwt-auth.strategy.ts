import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../database';
import { LoginService } from '../login';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(
    private readonly loginService: LoginService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string => {
          return request.cookies[configService.getOrThrow('ACCESS_TOKEN_KEY')];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return await this.loginService.loginById(payload.id);
  }
}
