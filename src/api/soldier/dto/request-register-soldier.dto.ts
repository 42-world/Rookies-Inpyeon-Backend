import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestRegisterSoldier {
  @ApiProperty()
  @IsString()
  campId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  nickname: string;
}
