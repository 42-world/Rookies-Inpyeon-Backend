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
      'title' | 'content' | 'writer' | 'linkId' | 'password'
    >,
  ): Promise<void> {
    await this.repository.insert(data);
  }

  async findByIdAndPassword(
    id: number,
    password: string,
  ): Promise<LetterEntity | null> {
    return await this.repository.findOneBy({ id, password });
  }

  async findAllByLinkId(linkId: number): Promise<LetterEntity[]> {
    return await this.repository.findBy({ linkId });
  }
}
