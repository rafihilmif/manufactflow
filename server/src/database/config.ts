import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: '.env' });

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, '..', 'migrations', '*.ts')], // Changed this line
  synchronize: false,
};

const AppDataSource = new DataSource(config);

export { AppDataSource };
export default config;
