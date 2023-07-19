import { ApiProperty } from '@nestjs/swagger';
import { LetterEntity } from '../database';

export class LetterPreview {
  @ApiProperty()
  readonly id: number;

  // @ApiProperty()
  // readonly title: string;

  // @ApiProperty()
  // readonly content: string;

  @ApiProperty()
  readonly writer: string;

  @ApiProperty()
  readonly hasPassword: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(
    id: number,
    // title: string,
    // content: string,
    writer: string,
    hasPassword: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    // this.title = title;
    // this.content = content;
    this.writer = writer;
    this.hasPassword = hasPassword;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromEntity(entity: LetterEntity): LetterPreview {
    return new LetterPreview(
      entity.id,
      // entity.title,
      // entity.content,
      entity.writer,
      !!entity.password,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
