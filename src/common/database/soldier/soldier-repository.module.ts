import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldierEntity } from './soldier.entity';
import { SoldierRepository } from './soldier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SoldierEntity])],
  providers: [SoldierRepository],
  exports: [TypeOrmModule, SoldierRepository],
})
export class SoldierRepositoryModule {}
