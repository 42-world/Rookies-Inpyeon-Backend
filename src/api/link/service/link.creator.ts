import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LinkRepository } from '../../../common/database';
import { MySoldierValidator, UniqueIdGenerator } from '../../../common/service';
import { Retry } from '../../../common/utils';

@Injectable()
export class LinkCreator {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly mySoldierValidator: MySoldierValidator,
    private readonly uniqueIdGenerator: UniqueIdGenerator,
  ) {}

  async create(
    userId: number,
    soldierId: number,
    description: string,
  ): Promise<void> {
    await this.mySoldierValidator.mySoldierOrThrow(userId, soldierId);
    await this.tryCreateLink(soldierId, description);
  }

  @Retry({ attempts: 3 })
  private async tryCreateLink(
    soldierId: number,
    description: string,
  ): Promise<void> {
    const displayId = this.uniqueIdGenerator.lowerLetters(3);
    try {
      return await this.linkRepository.create({
        soldierId,
        description,
        displayId,
      });
    } catch (e: any) {
      // TODO: log error
      // TODO: use runtime error filter
      throw new InternalServerErrorException('Failed to create link');
    }
  }
}
