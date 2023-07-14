import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('KAKAO_CLIENT_ID'),
      callbackURL: configService.getOrThrow('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    done(null, profile);
  }
}
