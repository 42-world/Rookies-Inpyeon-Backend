import { Injectable, NotFoundException } from '@nestjs/common';
import { LinkEntity, LinkRepository } from '../../../common/database';
import { MySoldierValidator } from '../../../common/service';

@Injectable()
export class LinkFinder {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly mySoldierValidator: MySoldierValidator,
  ) {}

  async findLink(userId: number, linkId: number): Promise<LinkEntity> {
    const link = await this.linkRepository.findById(linkId);

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    await this.mySoldierValidator.mySoldierOrThrow(userId, link.soldierId);

    return link;
  }

  async findLinkByDisplayId(
    soldierId: number,
    displayId: string,
  ): Promise<LinkEntity> {
    const link = await this.linkRepository.findByDisplayIdAndSoldierId(
      soldierId,
      displayId,
    );

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
  }

  async findLinksBySoldier(
    userId: number,
    soldierId: number,
  ): Promise<LinkEntity[]> {
    await this.mySoldierValidator.mySoldierOrThrow(userId, soldierId);

    return await this.linkRepository.findAllBySoldierId(soldierId);
  }
}
