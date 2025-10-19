import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_refresh_tokens')
export class UserRefreshTokenEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column({ type: 'text' })
  token_hash: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  expired_at: Date;
}
