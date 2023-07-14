import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { HealthModule } from './health';
import { UserModule } from './user';

@Module({
  imports: [AuthModule, HealthModule, UserModule],
})
export class ApiModule {}
