import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestCreateLetter {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  writer: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  linkId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
