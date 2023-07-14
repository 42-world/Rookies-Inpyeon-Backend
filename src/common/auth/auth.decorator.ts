import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

export const Auth = () =>
  applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: '인증 실패' }),
  );
