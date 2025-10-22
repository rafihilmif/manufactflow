import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import * as bcrypt from 'bcrypt';
import { RoleUserEntity } from '../../roles/entities/role.user.entity';
import { BranchEntity } from '../../branchs/entities/branch.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  user_id: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column({ type: 'varchar', nullable: true })
  first_name: string | null;

  @Column({ type: 'varchar', nullable: true })
  last_name: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  department_id: string | null;

  @Column({ type: 'varchar', nullable: true })
  manager_id: string | null;

  @OneToMany(() => DepartmentEntity, (department) => department.manager)
  managed_departments: DepartmentEntity[];

  @Column()
  is_active: boolean;

  @Column()
  hire_date: Date;

  @Column({ type: 'varchar', nullable: true })
  photo: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => RoleUserEntity, (roleUser) => roleUser.user)
  roleUser: RoleUserEntity;

  @ManyToOne(() => BranchEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branch_id', referencedColumnName: 'branch_id' })
  branchUser: UserEntity;

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
