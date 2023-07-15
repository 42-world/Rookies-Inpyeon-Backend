import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoManager {
  encrypt(data: string): string {
    // TODO: 단방향 암호화 로직 구현
    return data;
  }
}
