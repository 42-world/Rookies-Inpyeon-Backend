import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CookieManager, LoginService } from '../../common/auth';
import { KakaoProfile } from './kakao-auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService, //
    private readonly jwtService: JwtService,
    private readonly cookieManager: CookieManager,
    private readonly loginService: LoginService,
  ) {}

  async login(response: Response, profile: KakaoProfile) {
    const user = await this.loginService.loginByKakaoId(
      `${profile.id}`,
      profile.displayName,
    );

    const jwt = this.jwtService.sign({ id: user.id });

    this.cookieManager.set(response, {
      name: this.accessTokenName,
      value: jwt,
    });
  }

  signout(response: Response): void {
    this.cookieManager.clear(response, {
      name: this.accessTokenName,
    });
  }

  private get accessTokenName(): string {
    return this.configService.getOrThrow('ACCESS_TOKEN_KEY');
  }
}
