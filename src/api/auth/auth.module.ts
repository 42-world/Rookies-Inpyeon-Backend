import { Module } from '@nestjs/common';
import { CookieManagerMoudle, JwtModule, LoginModule } from '../../common/auth';
import { JwtAuthModule } from '../../common/auth/jwt/jwt-auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoAuthModule } from './kakao-auth';

@Module({
  imports: [
    KakaoAuthModule,
    JwtModule.forRoot(),
    JwtAuthModule,
    CookieManagerMoudle,
    LoginModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
