import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkEntity } from './link.entity';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly repository: Repository<LinkEntity>,
  ) {}

  async create(
    data: Pick<LinkEntity, 'soldierId' | 'displayId' | 'description'>,
  ): Promise<void> {
    try {
      await this.repository.insert(data);
    } catch (error) {
      throw new Error('Failed to create link');
    }
  }

  async findById(id: number): Promise<LinkEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByDisplayIdAndSoldierId(
    soldierId: number,
    displayId: string,
  ): Promise<LinkEntity | null> {
    return await this.repository.findOneBy({
      soldierId,
      displayId,
    });
  }

  async findAllBySoldierId(soldierId: number): Promise<LinkEntity[]> {
    return await this.repository.findBy({ soldierId });
  }
}
