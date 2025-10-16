import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleUserEntity } from './role.user.entity';

import { PermissionRoleEntity } from '../../permissions/entities/permission.role.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  role_id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  role_parent_id: string;

  @Column()
  level: number;

  @OneToMany(() => RoleUserEntity, (roleUser) => roleUser.role)
  roleUsers: RoleUserEntity[];

  @OneToMany(() => PermissionRoleEntity, (permissionRole) => permissionRole.role)
  permissionRoles: PermissionRoleEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
