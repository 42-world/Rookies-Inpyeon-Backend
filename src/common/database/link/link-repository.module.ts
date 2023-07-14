import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { LinkRepository } from './link.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  providers: [LinkRepository],
  exports: [TypeOrmModule, LinkRepository],
})
export class LinkRepositoryModule {}
