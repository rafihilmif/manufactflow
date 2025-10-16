import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import * as bcrypt from 'bcrypt';
import { RoleUserEntity } from '../../roles/entities/role.user.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  user_id: string;

  @Column()
  employee_id: string;

  @Column()
  password_hash: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  department_id: string;

  @Column()
  manager_id: string;

  @OneToMany(() => DepartmentEntity, (department) => department.manager)
  managed_departments: DepartmentEntity[];

  @Column()
  is_active: boolean;

  @Column()
  hire_date: Date;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => RoleUserEntity, (roleUser) => roleUser.user)
  roleUser: RoleUserEntity;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updated_at = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password_hash) {
      const salt = await bcrypt.genSalt(10);
      this.password_hash = await bcrypt.hash(this.password_hash, salt);
    }
  }
}
