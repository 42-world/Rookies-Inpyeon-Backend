import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigFactory } from './typeorm-config.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigFactory,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
