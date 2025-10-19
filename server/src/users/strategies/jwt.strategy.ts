import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

interface JwtPayload {
  userId: string;
  email: string;
}

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
  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOne({
      where: { user_id: payload.userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      userId: user.user_id,
      email: user.email,
    };
  }
}
