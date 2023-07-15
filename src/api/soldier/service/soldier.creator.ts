import { BadRequestException, Injectable } from '@nestjs/common';
import { SoldierRepository } from '../../../common/database';

@Injectable()
export class SoldierCreator {
  constructor(private readonly soldierRepository: SoldierRepository) {}

  async checkAvailableNickname(nickname: string): Promise<boolean> {
    const soldier = await this.soldierRepository.findByNickname(nickname);
    if (soldier) {
      return false;
    }

    return true;
  }

  async registerSoldier(
    userId: number,
    campId: string,
    name: string,
    nickname: string,
  ): Promise<void> {
    try {
      return await this.soldierRepository.create({
        registerUserId: userId,
        campId,
        name,
        nickname,
      });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
