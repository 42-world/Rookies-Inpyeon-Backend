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
import { UserEntity } from '../user';

@Entity({ name: 'soilder' })
export class SoilderEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  campId: string;

  @Column({ nullable: false })
  registerUserId: string;

  @ManyToOne(() => UserEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'register_user', referencedColumnName: 'id' })
  registerUser: Promise<UserEntity>;

  @Column({ type: 'varchar', length: 15, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
