import { Injectable } from '@nestjs/common';
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

    await this.mySoldierValidator.mySoldierOrThrow(userId, link.soilderId);

    return link;
  }

  async findLinksBySoldier(
    userId: number,
    soilderId: number,
  ): Promise<LinkEntity[]> {
    await this.mySoldierValidator.mySoldierOrThrow(userId, soilderId);

    return await this.linkRepository.findAllBySoilderId(soilderId);
  }
}
