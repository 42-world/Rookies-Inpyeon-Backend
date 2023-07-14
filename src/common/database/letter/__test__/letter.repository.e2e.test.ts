import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { LetterRepositoryModule } from '../letter-repository.module';
import { LetterRepository } from '../letter.repository';

jest.setTimeout(10000);
describe('LetterRepositoryE2e', () => {
  it('성공', async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, LetterRepositoryModule],
    }).compile();

    const letterRepository = app.get<LetterRepository>(LetterRepository);

    // await letterRepository.create({
    //   linkId: '1',
    //   title: 'test',
    //   content: 'test',
    //   writer: 'ycha',
    //   isHidden: false,
    // });

    const result = await letterRepository.findAllByLinkId('1');

    console.log(result);
  });
});
