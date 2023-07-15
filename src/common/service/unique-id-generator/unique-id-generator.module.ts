import { Module } from '@nestjs/common';
import { UniqueIdGenerator } from './unique-id.generator';

@Module({
  providers: [UniqueIdGenerator],
  exports: [UniqueIdGenerator],
})
export class UniqueIdGeneratorModule {}
