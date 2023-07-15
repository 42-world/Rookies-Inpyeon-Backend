import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '../../database';

@Injectable()
export class LoginService {
  constructor(private readonly userRepository: UserRepository) {}

  async loginById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async loginByKakaoId(
    kakaoId: string,
    kakaoName: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findByKakaoId(kakaoId);
    if (user) {
      return user;
    }

    await this.userRepository.create({ kakaoId, name: kakaoName });

    return await this.userRepository.findByKakaoId(kakaoId);
  }
}
