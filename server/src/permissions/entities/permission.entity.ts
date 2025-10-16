import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from './permission.role.entity';

export enum ModuleType {
  INVENTORY = 'inventory',
  PRODUCTION = 'production',
  PROCUREMENT = 'procurement',
}

export enum ResourceType {
  PRODUCTS = 'products',
  ORDERS = 'orders',
  BOM = 'bom',
}

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  permission_id: string;

  @Column({
    type: 'enum',
    enum: ModuleType,
    unique: true,
  })
  module: ModuleType;

  @Column({
    type: 'enum',
    enum: ResourceType,
    unique: true,
  })
  resource: ResourceType;

  @Column()
  action: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => PermissionRoleEntity, (permissionRole) => permissionRole.permission)
  permissionRoles: PermissionRoleEntity[];
}
