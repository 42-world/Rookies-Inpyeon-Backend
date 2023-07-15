import { ApiProperty } from '@nestjs/swagger';
import { LetterEntity } from '../database';

export class LetterPreview {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly writer: string;

  @ApiProperty()
  readonly isSent: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(
    id: number,
    title: string,
    content: string,
    writer: string,
    isSent: boolean,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.writer = writer;
    this.isSent = isSent;
    this.createdAt = createdAt;
  }

  static fromEntity(entity: LetterEntity): LetterPreview {
    return new LetterPreview(
      entity.id,
      entity.title,
      entity.content,
      entity.writer,
      entity.isSent,
      entity.createdAt,
    );
  }
}
