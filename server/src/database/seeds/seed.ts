import { AppDataSource } from '../config';
import { AdminSeeder } from './admin.seeder';

async function bootstrap() {
  try {
    console.log('Starting database seeding...');

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    console.log('Database connected');

    const adminSeeder = new AdminSeeder();
    await adminSeeder.run(AppDataSource);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

bootstrap();
