import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestRegisterSoldier {
  @ApiProperty({ example: '차영훈' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ycha' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ example: '예비군인/훈련병' })
  @IsString()
  @IsNotEmpty()
  soldierType: string;

  @ApiProperty({ example: '육군' })
  @IsString()
  @IsNotEmpty()
  soldierClass: string;

  @ApiProperty({ example: '육군훈련소-논산' })
  @IsString()
  @IsNotEmpty()
  troopName: string;

  @ApiProperty({ example: '2000-08-29' })
  @IsString()
  @IsNotEmpty()
  birth: string;

  @ApiProperty({ example: '2023-07-20' })
  @IsString()
  @IsNotEmpty()
  enterDate: string;
}
