import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestCreateLink {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  soldierId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
