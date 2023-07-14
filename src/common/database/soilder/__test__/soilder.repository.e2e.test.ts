import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { SoilderRepositoryModule } from '../soilder-repository.module';
import { SoilderRepository } from '../soilder.repository';

jest.setTimeout(10000);
describe('SoilderRepositoryE2e', () => {
  it('성공', async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, SoilderRepositoryModule],
    }).compile();

    const soilderRepository = app.get<SoilderRepository>(SoilderRepository);

    // await soilderRepository.create({
    //   registerUserId: '1',
    //   campId: '1',
    //   name: 'ycha',
    // });

    const result = await soilderRepository.findById('1');

    console.log(result);
  });
});
