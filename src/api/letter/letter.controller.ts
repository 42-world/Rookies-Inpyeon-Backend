import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LetterEntity } from '../../common/database';
import { LetterPreview } from '../../common/domain/letter-preview';
import { RequestCreateLetter } from './dto';
import { LetterService } from './letter.service';

@ApiTags('Letter')
@Controller('letter')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Get('by/linkId/:linkId')
  @ApiOperation({ summary: '링크에 있는 모든 편지 가져오기' })
  @ApiOkResponse({ description: '편지 목록', type: [LetterPreview] })
  async getLetterPreviewByLink(
    @Param('linkId', ParseIntPipe) linkId: number,
  ): Promise<LetterPreview[]> {
    return await this.letterService.findLetterPreviewByLink(linkId);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 편지 가져오기' })
  @ApiOkResponse({ description: '편지 정보', type: LetterEntity })
  async getLetter(
    @Param('id', ParseIntPipe) letterId: number,
    @Query('password') password: string,
  ): Promise<LetterEntity> {
    return await this.letterService.findLetter(letterId, password);
  }

  @Post()
  @ApiOperation({ summary: '편지 작성하기' })
  @ApiCreatedResponse()
  async createLetter(@Body() body: RequestCreateLetter): Promise<void> {
    return await this.letterService.createLetter(
      body.content,
      body.writer,
      body.linkId,
      body.password,
    );
  }
}
