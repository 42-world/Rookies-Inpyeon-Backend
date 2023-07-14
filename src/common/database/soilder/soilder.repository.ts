import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoilderEntity } from './soilder.entity';

@Injectable()
export class SoilderRepository {
  constructor(
    @InjectRepository(SoilderEntity)
    private readonly repository: Repository<SoilderEntity>,
  ) {}

  async create(
    data: Pick<SoilderEntity, 'campId' | 'registerUserId' | 'name'>,
  ): Promise<void> {
    await this.repository.upsert(data, ['campId']);
  }

  async findById(id: string): Promise<SoilderEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAllByUserId(userId: string): Promise<SoilderEntity[]> {
    return await this.repository.findBy({
      registerUserId: userId,
    });
  }
}
