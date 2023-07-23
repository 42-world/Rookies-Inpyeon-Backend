import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { LetterService } from '../letter.service';
import {
  LetterRepository,
  LetterRepositoryModule,
} from '../../../common/database';
import { BadRequestException } from '@nestjs/common';
import { CryptoManagerModule } from '../../../common/service';

describe('LetterService', () => {
  let letterRepository: LetterRepository;
  let letterService: LetterService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, CryptoManagerModule, LetterRepositoryModule],
      providers: [LetterService],
    }).compile();

    letterRepository = app.get<LetterRepository>(LetterRepository);
    letterService = app.get<LetterService>(LetterService);
  });

  it('비밀번호가 걸린 편지는 비밀번호 없이 가져올수 없다.', async () => {
    // given
    const linkId = 1;
    await letterRepository.create({
      title: 'title',
      content: 'content',
      writer: 'writer',
      linkId: linkId,
      password: 'password',
    });

    // when
    await expect(async () => {
      await letterService.findLetter(linkId);
    }).rejects.toThrowError(new BadRequestException('Password is wrong'));
  });
});
