import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueIdGenerator {
  private readonly letterCharacters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly numberCharacters = '0123456789';

  letters(length: number) {
    return this.generate(length, this.letterCharacters);
  }

  lowerLetters(length: number) {
    return this.generate(length, this.letterCharacters.slice(0, 26));
  }

  upperLetters(length: number) {
    return this.generate(length, this.letterCharacters.slice(26));
  }

  numbers(length: number) {
    return this.generate(length, this.numberCharacters);
  }

  private generate(length: number, characters: string) {
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
