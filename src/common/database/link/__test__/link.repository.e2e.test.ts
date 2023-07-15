import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { LinkRepositoryModule } from '../link-repository.module';
import { LinkRepository } from '../link.repository';

jest.setTimeout(10000);
describe('LinkRepositoryE2e', () => {
  it('성공', async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, LinkRepositoryModule],
    }).compile();

    const linkRepository = app.get<LinkRepository>(LinkRepository);

    await linkRepository.create({
      soilderId: 1,
      displayId: String(Math.floor(Math.random() * 1000000)),
      description: 'test',
    });

    const result = await linkRepository.findAllBySoilderId(1);

    console.log(result);
  });
});
