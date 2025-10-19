import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CompanyLocationType {
  HEADQUARTERS = 'headquarters',
  PLANT = 'plant',
  WAREHOUSE = 'warehouse',
  OFFICE = 'office',
}

@Entity('company_locations')
export class CompanyLocation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  company_location_id: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: CompanyLocationType,
  })
  location: CompanyLocationType;

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
}
