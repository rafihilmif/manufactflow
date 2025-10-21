import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { config as dotenvConfig } from 'dotenv';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserRequest } from '../interfaces/user-request.interface';

dotenvConfig({ path: '.env' });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    const jwtSecret = process.env.JWT_TOKEN;
    if (!jwtSecret) {
      throw new Error('JWT_TOKEN is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret as string,
    });
  }

  async validate(payload: JwtPayload): Promise<UserRequest> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roleUser', 'roleUser')
      .leftJoinAndSelect('roleUser.role', 'role')
      .select(['user.user_id', 'user.email', 'roleUser.id', 'role.role_id', 'role.name'])
      .where('user.email = :email', { email: payload.email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Access denied or expired token');
    }

    const roleName = user.roleUser?.role?.name;
    if (!roleName) {
      throw new UnauthorizedException('Access denied or expired token');
    }

    return {
      userId: user.user_id,
      email: user.email,
      role: roleName,
    };
  }
}
