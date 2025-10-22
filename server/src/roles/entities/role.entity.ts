import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleUserEntity } from './role.user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  role_id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  level: number;

  @OneToMany(() => RoleUserEntity, (userRoles) => userRoles.role)
  userRole: RoleUserEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
