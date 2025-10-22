import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum BranchLocationType {
  HEADQUARTERS = 'headquarters',
  PLANT = 'plant',
  WAREHOUSE = 'warehouse',
  OFFICE = 'office',
}

@Entity('branchs')
export class BranchEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  branch_id: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: BranchLocationType,
  })
  type_location: BranchLocationType;

  @Column({ type: 'text' })
  address: string;

  @Column()
  province: string;

  @Column()
  city: string;

  @Column()
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => UserEntity, (UserBranchs) => UserBranchs.branchUser)
  userBranchs: UserEntity[];
}
