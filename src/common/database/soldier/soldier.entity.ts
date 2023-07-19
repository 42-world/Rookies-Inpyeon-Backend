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

@Entity({ name: 'soldier' })
export class SoldierEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  nickname: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  campId?: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  soldierType: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  soldierClass: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  troopName: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  birth: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  enterDate: string;

  @Column({ type: 'int', nullable: false })
  registerUserId: number;

  @ManyToOne(() => UserEntity, {
    lazy: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'register_user_id', referencedColumnName: 'id' })
  registerUser: Promise<UserEntity>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
