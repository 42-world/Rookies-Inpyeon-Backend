import { Injectable, NotFoundException } from '@nestjs/common';
import { SoldierRepository } from '../../database';

@Injectable()
export class MySoldierValidator {
  constructor(private readonly soldierRepository: SoldierRepository) {}

  async isMySoldier(userId: number, soldierId: number): Promise<boolean> {
    const soldier = await this.soldierRepository.findByIdAndUserId(
      soldierId,
      userId,
    );

    return !!soldier;
  }

  async mySoldierOrThrow(userId: number, soldierId: number): Promise<void> {
    const soldier = await this.soldierRepository.findByIdAndUserId(
      soldierId,
      userId,
    );

    if (!soldier) {
      throw new NotFoundException('해당하는 군인이 등록되어있지 않습니다.');
    }
  }
}
