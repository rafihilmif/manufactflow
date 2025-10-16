import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseConn from '../database/db_connection';
import { ConfigModule } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConn),
    UsersModule,
    DepartmentsModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
