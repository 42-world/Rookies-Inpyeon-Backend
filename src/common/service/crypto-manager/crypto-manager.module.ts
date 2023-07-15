import { Module } from '@nestjs/common';
import { CryptoManager } from './crypto.manager';

@Module({
  providers: [CryptoManager],
  exports: [CryptoManager],
})
export class CryptoManagerModule {}
