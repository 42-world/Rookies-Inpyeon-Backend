import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { SoldierEntity } from '../soldier';

@Entity({ name: 'link' })
@Unique(['soilderId', 'displayId'])
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  soilderId: number;

  @ManyToOne(() => SoldierEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'soilder_id', referencedColumnName: 'id' })
  soilder: Promise<SoldierEntity>;

  @Column({ type: 'varchar', length: 15, nullable: false })
  displayId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
