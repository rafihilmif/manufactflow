import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoleEntity } from './role.entity';

@Entity('role_users')
export class RoleUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  role_id: string;

  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ nullable: true })
  assigned_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;
}
