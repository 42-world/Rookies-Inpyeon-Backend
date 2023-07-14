import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../../common';
import { Auth, AuthUser } from '../../common/auth';

@ApiTags('User')
@Controller('users')
export class UserController {
  @Get()
  @Auth()
  @ApiOperation({ summary: '내 정보 가져오기' })
  @ApiOkResponse({ description: '내 정보', type: UserEntity })
  async me(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
