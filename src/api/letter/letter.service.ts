import { Injectable } from '@nestjs/common';
import { LetterEntity, LetterRepository } from '../../common/database';
import { LetterPreview } from '../../common/domain/letter-preview';
import { CryptoManager } from '../../common/service';

@Injectable()
export class LetterService {
  constructor(
    private readonly letterRepository: LetterRepository,
    private readonly cryptoManager: CryptoManager,
  ) {}

  async findLetter(linkId: number, password: string): Promise<LetterEntity> {
    const encryptedPassword = this.cryptoManager.encrypt(password);

    return await this.letterRepository.findByIdAndPassword(
      linkId,
      encryptedPassword,
    );
  }

  async findLetterPreviewByLink(soldierId: number): Promise<LetterPreview[]> {
    const letters = await this.letterRepository.findAllByLinkId(soldierId);

    return letters.map(LetterPreview.fromEntity);
  }

  async createLetter(
    title: string,
    content: string,
    writer: string,
    linkId: number,
    password: string,
  ): Promise<void> {
    const encryptedPassword = this.cryptoManager.encrypt(password);

    return await this.letterRepository.create({
      title,
      content,
      writer,
      linkId,
      password: encryptedPassword,
    });
  }
}