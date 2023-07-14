import { Controller, Delete, Get, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Auth, AuthUser } from '../../common/auth';
import { AuthService } from './auth.service';
import { KakaoAuth, KakaoProfile } from './kakao-auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @KakaoAuth()
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiOkResponse({ description: '카카오 로그인 페이지' })
  kakaoLogin(): void {
    return;
  }

  @Get('kakao/callback')
  @KakaoAuth()
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiOkResponse({ description: '카카오 로그인 페이지' })
  async kakaoLoginCallback(
    @AuthUser() profile: KakaoProfile,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.login(response, profile);
  }

  @Delete('signout')
  @Auth()
  @ApiOperation({ summary: '로그아웃' })
  @ApiOkResponse({ description: '로그아웃 성공' })
  signout(@Res({ passthrough: true }) response: Response): void {
    this.authService.signout(response);
  }
}
