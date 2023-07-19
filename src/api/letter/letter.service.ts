import { Injectable, NotFoundException } from '@nestjs/common';
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
    const letter = await this.letterRepository.findByIdAndPassword(
      linkId,
      encryptedPassword,
    );

    if (!letter) {
      throw new NotFoundException('Letter not found Or Password is wrong');
    }

    return letter;
  }

  async findLetterPreviewByLink(soldierId: number): Promise<LetterPreview[]> {
    const letters = await this.letterRepository.findAllByLinkId(soldierId);

    return letters.map(LetterPreview.fromEntity);
  }

  async createLetter(
    content: string,
    writer: string,
    linkId: number,
    password?: string,
  ): Promise<void> {
    const title = content.slice(0, 15);
    if (password) {
      const encryptedPassword = this.cryptoManager.encrypt(password);

      return await this.letterRepository.create({
        title,
        content,
        writer,
        linkId,
        password: encryptedPassword,
      });
    }

    return await this.letterRepository.create({
      title,
      content,
      writer,
      linkId,
    });
  }
}
