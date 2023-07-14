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
    data: Pick<LinkEntity, 'soilderId' | 'displayId' | 'description'>,
  ): Promise<void> {
    await this.repository.insert(data);
  }

  async findById(id: string): Promise<LinkEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAllBySoilderId(soilderId: string): Promise<LinkEntity[]> {
    return await this.repository.findBy({ soilderId });
  }
}
