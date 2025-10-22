import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import DbConnection from './database/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';
import { BranchsModule } from './branchs/branchs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DbConnection),
    UsersModule,
    DepartmentsModule,
    RolesModule,
    BranchsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
