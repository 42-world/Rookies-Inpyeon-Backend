import { Module } from '@nestjs/common';
import { SoldierRepositoryModule } from '../../common/database';
import { SoldierCreator, SoldierFinder } from './service';
import { SoldierController } from './soldier.controller';

@Module({
  imports: [SoldierRepositoryModule],
  controllers: [SoldierController],
  providers: [SoldierFinder, SoldierCreator],
})
export class SoldierModule {}
