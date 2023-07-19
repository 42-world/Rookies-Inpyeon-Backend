import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestCreateLetter {
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password?: string;
}
