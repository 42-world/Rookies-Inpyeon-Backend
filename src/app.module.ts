import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api';
import { DatabaseModule } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    ApiModule,
  ],
})
export class AppModule {}
