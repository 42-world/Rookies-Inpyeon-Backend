import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LoginModule } from '../login';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [PassportModule, LoginModule],
  providers: [JwtAuthStrategy],
})
export class JwtAuthModule {}
