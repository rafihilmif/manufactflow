import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRefreshTokenEntity } from './entities/user.refreshtoken.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRefreshTokenEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, JwtStrategy, JwtModule],
})
export class UsersModule {}
