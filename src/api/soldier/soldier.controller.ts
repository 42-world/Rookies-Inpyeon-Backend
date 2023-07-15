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
import { SoldierEntity, UserEntity } from '../../common/database';
import { RequestRegisterSoldier, ResponseAvailableNicknameDto } from './dto';
import { SoldierCreator, SoldierFinder } from './service';

@ApiTags('Soldier')
@Controller('soldier')
export class SoldierController {
  constructor(
    private readonly soldierFinder: SoldierFinder,
    private readonly soldierCreator: SoldierCreator,
  ) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: '내 군인 가져오기' })
  @ApiOkResponse({ description: '등록된 군인', type: [SoldierEntity] })
  async getSoldiersByUser(
    @AuthUser() user: UserEntity,
  ): Promise<SoldierEntity[]> {
    return await this.soldierFinder.findSoldiersByUser(user.id);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: '특정 군인 가져오기' })
  @ApiOkResponse({ description: '군인 정보', type: SoldierEntity })
  async getSoldier(
    @AuthUser() user: UserEntity,
    @Param('id', ParseIntPipe) soilderId: number,
  ): Promise<SoldierEntity> {
    return await this.soldierFinder.findSoldier(user.id, soilderId);
  }

  @Get('nickname/:nickname')
  @Auth()
  @ApiOperation({ summary: '닉네임으로 군인 정보 가져오기' })
  @ApiOkResponse({ description: '군인 정보', type: SoldierEntity })
  async getSoldierByNickname(
    @AuthUser() user: UserEntity,
    @Param('nickname') nickname: string,
  ): Promise<SoldierEntity> {
    return await this.soldierFinder.findSoldierByNickname(user.id, nickname);
  }

  @Get('check/nickname')
  @Auth()
  @ApiOperation({ summary: '닉네임 확인' })
  @ApiOkResponse({ type: ResponseAvailableNicknameDto })
  async checkNickname(
    @Query('nickname') nickname: string,
  ): Promise<ResponseAvailableNicknameDto> {
    const isAvailable = await this.soldierCreator.checkAvailableNickname(
      nickname,
    );

    return { isAvailable };
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: '군인 추가하기' })
  @ApiCreatedResponse()
  async registerSoldier(
    @AuthUser() user: UserEntity,
    @Body() body: RequestRegisterSoldier,
  ): Promise<void> {
    return await this.soldierCreator.registerSoldier(
      user.id,
      body.campId,
      body.name,
      body.nickname,
    );
  }
}
