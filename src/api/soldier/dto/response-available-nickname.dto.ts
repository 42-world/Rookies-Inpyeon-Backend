import { ApiProperty } from '@nestjs/swagger';

export class ResponseAvailableNicknameDto {
  @ApiProperty()
  isAvailable: boolean;
}
