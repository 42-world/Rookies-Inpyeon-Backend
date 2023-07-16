import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LinkEntity } from '../link';

@Entity({ name: 'letter' })
export class LetterEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  linkId: number;

  @ManyToOne(() => LinkEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'link_id', referencedColumnName: 'id' })
  link: Promise<LinkEntity>;

  @ApiProperty()
  @Column({ type: 'varchar', length: 42, nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 4000, nullable: false })
  content: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 15, nullable: false })
  writer: string;

  @ApiProperty()
  @Column({ type: 'boolean', nullable: false, default: false })
  isSent: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', length: 15, nullable: false })
  password: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiPropertyOptional()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
