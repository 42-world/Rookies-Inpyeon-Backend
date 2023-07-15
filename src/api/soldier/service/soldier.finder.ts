import { Injectable } from '@nestjs/common';
import { SoldierEntity, SoldierRepository } from '../../../common/database';

@Injectable()
export class SoldierFinder {
  constructor(private readonly soldierRepository: SoldierRepository) {}

  async findSoldier(userId: number, soilderId: number): Promise<SoldierEntity> {
    return await this.soldierRepository.findByIdAndUserId(soilderId, userId);
  }

  async findSoldierByNickname(
    userId: number,
    nickname: string,
  ): Promise<SoldierEntity> {
    return await this.soldierRepository.findByNicknmaeAndUserId(
      userId,
      nickname,
    );
  }

  async findSoldiersByUser(userId: number): Promise<SoldierEntity[]> {
    return await this.soldierRepository.findAllByUserId(userId);
  }
}
