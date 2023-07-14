import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LetterEntity } from './letter.entity';

@Injectable()
export class LetterRepository {
  constructor(
    @InjectRepository(LetterEntity)
    private readonly repository: Repository<LetterEntity>,
  ) {}

  async create(
    data: Pick<
      LetterEntity,
      'title' | 'content' | 'writer' | 'linkId' | 'isHidden'
    >,
  ): Promise<void> {
    await this.repository.insert(data);
  }

  async findById(id: string): Promise<LetterEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAllByLinkId(linkId: string): Promise<LetterEntity[]> {
    return await this.repository.findBy({ linkId });
  }
}
