import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterEntity } from './letter.entity';
import { LetterRepository } from './letter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LetterEntity])],
  providers: [LetterRepository],
  exports: [TypeOrmModule, LetterRepository],
})
export class LetterRepositoryModule {}
