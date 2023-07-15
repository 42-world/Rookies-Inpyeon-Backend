import { Module } from '@nestjs/common';
import { LinkRepositoryModule } from '../../common/database';
import {
  MySoldierValidatorModule,
  UniqueIdGeneratorModule,
} from '../../common/service';
import { LinkController } from './link.controller';
import { LinkCreator, LinkFinder } from './service';

@Module({
  imports: [
    LinkRepositoryModule,
    MySoldierValidatorModule,
    UniqueIdGeneratorModule,
  ],
  controllers: [LinkController],
  providers: [LinkFinder, LinkCreator],
})
export class LinkModule {}
