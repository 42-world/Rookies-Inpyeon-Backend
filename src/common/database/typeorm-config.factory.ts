import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PHASE } from '../../core';

@Injectable()
export class TypeOrmConfigFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getOrThrow('DB_HOST'),
      port: this.configService.getOrThrow('DB_PORT'),
      username: this.configService.getOrThrow('DB_USER_NAME'),
      password: this.configService.getOrThrow('DB_USER_PASSWORD'),
      database: this.configService.getOrThrow('DB_NAME'),
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      namingStrategy: new SnakeNamingStrategy(),
      logging: PHASE === 'dev',
      synchronize: PHASE === 'dev',
    };
  }
}
