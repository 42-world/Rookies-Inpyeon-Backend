import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { UserRepositoryModule } from '../user-repository.module';
import { UserRepository } from '../user.repository';

jest.setTimeout(10000);
describe('UserRepositoryE2e', () => {
  it('성공', async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule, UserRepositoryModule],
    }).compile();

    const userRepository = app.get<UserRepository>(UserRepository);

    const result = await userRepository.findById(1);

    console.log(result);
  });
});
