import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from '../config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return AppDataSource;
      },
    }),
  ],
})
export class SeedModule {}
