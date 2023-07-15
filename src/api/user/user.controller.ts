import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, AuthUser } from '../../common/auth';
import { UserEntity } from '../../common/database';

@ApiTags('User')
@Controller('users')
export class UserController {
  @Get()
  @Auth()
  @ApiOperation({ summary: '내 정보 가져오기 (로그인 여부 판단)' })
  @ApiOkResponse({ description: '내 정보', type: UserEntity })
  async me(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
