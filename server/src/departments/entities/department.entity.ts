import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum DepartmentType {
  PRODUCTION = 'production',
  WAREHOUSE = 'warehouse',
  FINANCE = 'finance',
  SALES = 'sales',
}

@Entity('departements')
export class DepartmentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  department_id: string;

  @Column({
    type: 'enum',
    enum: DepartmentType,
  })
  department_type: DepartmentType;

  @Column()
  cost_center_code: string;

  @Column({ nullable: true })
  manager_id: string;

  @ManyToOne(() => UserEntity, (user) => user.managed_departments)
  @JoinColumn({
    name: 'manager_id',
    referencedColumnName: 'user_id',
  })
  manager: UserEntity;

  @Column()
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
