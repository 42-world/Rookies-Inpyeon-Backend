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
import { SoilderEntity } from '../soilder';

@Entity({ name: 'link' })
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  soilderId: string;

  @ManyToOne(() => SoilderEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'soilder_id', referencedColumnName: 'id' })
  soilder: Promise<SoilderEntity>;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
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
