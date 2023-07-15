import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RequestCreateLetter {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  writer: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  linkId: number;

  @ApiProperty()
  @IsString()
  password: string;
}
