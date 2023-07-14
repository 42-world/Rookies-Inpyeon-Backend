import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { UserRepository } from '../user.repository';

jest.setTimeout(10000);
describe('UserRepositoryE2e', () => {
  it('성공', async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const userRepository = app.get<UserRepository>(UserRepository);

    await userRepository.create({
      kakaoId: '1234',
      name: '차영훈',
    });
  });
});
