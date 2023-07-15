import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoldierEntity } from './soldier.entity';

@Injectable()
export class SoldierRepository {
  constructor(
    @InjectRepository(SoldierEntity)
    private readonly repository: Repository<SoldierEntity>,
  ) {}

  async create(
    data: Pick<
      SoldierEntity,
      'campId' | 'registerUserId' | 'name' | 'nickname'
    >,
  ): Promise<void> {
    try {
      await this.repository.insert(data);
    } catch (error) {
      throw new Error('Failed to create soldier');
    }
  }

  async findByNickname(nickname: string): Promise<SoldierEntity | null> {
    return await this.repository.findOneBy({ nickname });
  }

  async findByNicknmaeAndUserId(
    userId: number,
    nickname: string,
  ): Promise<SoldierEntity | null> {
    return await this.repository.findOneBy({
      nickname,
      registerUserId: userId,
    });
  }

  async findByIdAndUserId(
    id: number,
    userId: number,
  ): Promise<SoldierEntity | null> {
    return await this.repository.findOneBy({ id, registerUserId: userId });
  }

  async findAllByUserId(userId: number): Promise<SoldierEntity[]> {
    return await this.repository.findBy({
      registerUserId: userId,
    });
  }
}
