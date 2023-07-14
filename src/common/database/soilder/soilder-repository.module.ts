import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoilderEntity } from './soilder.entity';
import { SoilderRepository } from './soilder.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SoilderEntity])],
  providers: [SoilderRepository],
  exports: [TypeOrmModule, SoilderRepository],
})
export class SoilderRepositoryModule {}
