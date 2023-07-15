import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { SoldierRepositoryModule } from '../soldier-repository.module';
import { SoldierRepository } from '../soldier.repository';

jest.setTimeout(10000);
describe('SoliderRepositoryE2e', () => {
  it('성공', async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, SoldierRepositoryModule],
    }).compile();

    const soldierRepository = app.get<SoldierRepository>(SoldierRepository);

    // await soldierRepository.create({
    //   registerUserId: '1',
    //   campId: '1',
    //   name: 'ycha',
    // });

    const result = await soldierRepository.findByIdAndUserId(1, 1);

    console.log(result);
  });
});
