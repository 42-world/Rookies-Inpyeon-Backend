import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: Pick<UserEntity, 'kakaoId' | 'name'>): Promise<void> {
    await this.repository.upsert(data, ['kakaoId']);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByKakaoId(kakaoId: string): Promise<UserEntity | null> {
    return await this.repository.findOneBy({ kakaoId });
  }
}
