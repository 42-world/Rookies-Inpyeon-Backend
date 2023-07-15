import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RequestCreateLink {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  soldierId: number;

  @ApiProperty()
  @IsString()
  description: string;
}
