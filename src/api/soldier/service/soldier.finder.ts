import { Injectable, NotFoundException } from '@nestjs/common';
import { SoldierEntity, SoldierRepository } from '../../../common/database';

@Injectable()
export class SoldierFinder {
  constructor(private readonly soldierRepository: SoldierRepository) {}

  async findSoldier(userId: number, soldierId: number): Promise<SoldierEntity> {
    const soldier = await this.soldierRepository.findByIdAndUserId(
      soldierId,
      userId,
    );

    if (!soldier) {
      throw new NotFoundException('Soldier not found');
    }

    return soldier;
  }

  async findSoldierByNickname(nickname: string): Promise<SoldierEntity> {
    const soldier = await this.soldierRepository.findByNickname(nickname);

    if (!soldier) {
      throw new NotFoundException('Soldier not found');
    }

    return soldier;
  }

  async findSoldiersByUser(userId: number): Promise<SoldierEntity[]> {
    return await this.soldierRepository.findAllByUserId(userId);
  }
}
