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

  @Get('by/soldierId/:soldierId')
  @Auth()
  @ApiOperation({ summary: '군인의 모든 링크 가져오기' })
  @ApiOkResponse({ description: '등록된 링크', type: [LinkEntity] })
  async findLinksBySoldier(
    @AuthUser() user: UserEntity,
    @Param('soldierId', ParseIntPipe) soldierId: number,
  ): Promise<LinkEntity[]> {
    return await this.linkFinder.findLinksBySoldier(user.id, soldierId);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: '특정 링크 가져오기' })
  @ApiOkResponse({ description: '링크 정보', type: LinkEntity })
  async findLink(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) linkId: number,
  ): Promise<LinkEntity> {
    return await this.linkFinder.findLink(user.id, linkId);
  }

  @Get()
  @ApiOperation({ summary: 'soldierId, displayID 로 링크 가져오기' })
  @ApiOkResponse({ description: '링크 정보', type: LinkEntity })
  async findLinkByDisplayId(
    @Query('soldierId', ParseIntPipe) soldierId: number,
    @Query('displayId') displayId: string,
  ): Promise<LinkEntity> {
    return await this.linkFinder.findLinkByDisplayId(soldierId, displayId);
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
