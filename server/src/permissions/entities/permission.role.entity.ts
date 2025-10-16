import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { PermissionEntity } from './permission.entity';

@Entity('permission_roles')
export class PermissionRoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  role_id: string;

  @Column()
  permission_id: string;

  @ManyToOne(() => RoleEntity, (role) => role.permissionRoles)
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, (permission) => permission.permissionRoles)
  permission: PermissionEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  granted_at: Date;
}
