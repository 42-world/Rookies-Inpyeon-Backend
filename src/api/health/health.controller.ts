import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: '헬스 체크' })
  @ApiOkResponse({ description: 'ok' })
  ok() {
    return 'ok';
  }
}
