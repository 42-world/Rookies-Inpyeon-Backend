import { Module } from '@nestjs/common';
import { LetterRepositoryModule } from '../../common/database';
import { CryptoManagerModule } from '../../common/service';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';

@Module({
  imports: [LetterRepositoryModule, CryptoManagerModule],
  controllers: [LetterController],
  providers: [LetterService],
})
export class LetterModule {}
