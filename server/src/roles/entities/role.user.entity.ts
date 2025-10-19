import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoleEntity } from './role.entity';

@Entity('role_users')
export class RoleUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  role_id: string;

  @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  role: RoleEntity;

  @Column({ type: 'varchar' })
  user_id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  assigned_by: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;
}
