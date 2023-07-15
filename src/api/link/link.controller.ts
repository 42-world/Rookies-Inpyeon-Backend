import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, AuthUser } from '../../common/auth';
import { LinkEntity, UserEntity } from '../../common/database';
import { RequestCreateLink } from './dto';
import { LinkCreator, LinkFinder } from './service';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(
    private readonly linkFinder: LinkFinder,
    private readonly linkCreator: LinkCreator,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: '내 링크 가져오기' })
  @ApiOkResponse({ description: '등록된 링크', type: [LinkEntity] })
  async getLinksBySoldier(
    @AuthUser() user: UserEntity,
    @Query('soldierId', ParseIntPipe) soldierId: number,
  ): Promise<LinkEntity[]> {
    return await this.linkFinder.findLinksBySoldier(user.id, soldierId);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: '특정 링크 가져오기' })
  @ApiOkResponse({ description: '링크 정보', type: LinkEntity })
  async getLink(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) linkId: number,
  ): Promise<LinkEntity> {
    return await this.linkFinder.findLink(user.id, linkId);
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: '링크 생성하기' })
  @ApiCreatedResponse()
  async createLink(
    @AuthUser() user: UserEntity,
    @Body() body: RequestCreateLink,
  ): Promise<void> {
    return await this.linkCreator.create(
      user.id,
      body.soldierId,
      body.description,
    );
  }
}
