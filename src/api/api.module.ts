import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { LetterModule } from './letter';
import { LinkModule } from './link';
import { SoldierModule } from './soldier';
import { UserModule } from './user';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    UserModule,
    SoldierModule,
    LinkModule,
    LetterModule,
  ],
})
export class ApiModule {}
