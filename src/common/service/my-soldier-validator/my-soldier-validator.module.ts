import { Module } from '@nestjs/common';
import { SoldierRepositoryModule } from '../../database';
import { MySoldierValidator } from './my-soldier.validator';

@Module({
  imports: [SoldierRepositoryModule],
  providers: [MySoldierValidator],
  exports: [MySoldierValidator],
})
export class MySoldierValidatorModule {}
