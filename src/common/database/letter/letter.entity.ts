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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  linkId: number;

  @ManyToOne(() => LinkEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'link_id', referencedColumnName: 'id' })
  link: Promise<LinkEntity>;

  @Column({ type: 'varchar', length: 42, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 4000, nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  writer: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  isSent: boolean;

  @Column({ type: 'varchar', length: 15, nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
