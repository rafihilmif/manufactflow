import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserRefreshTokenEntity } from './entities/user.refreshtoken.entity';
import { JwtService } from '@nestjs/jwt';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

interface TokenPayload {
  userId: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserRefreshTokenEntity)
    private refreshTokenRepository: Repository<UserRefreshTokenEntity>,
    private jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const matchPassword = await compare(loginUserDto.password, user.password_hash);

    if (!matchPassword) {
      throw new HttpException('Password incorrect', HttpStatus.UNAUTHORIZED);
    }

    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.email, tokens.refresh_token);

    return tokens;
  }

  async generateTokens(user: UserEntity): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const payload: TokenPayload = {
      userId: user.user_id,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async saveRefreshToken(email: string, refreshToken: string): Promise<void> {
    const tokenHash = await hash(refreshToken, 10);

    const expiredDate = new Date();
    expiredDate.setDate(expiredDate.getDate() + 7);

    await this.refreshTokenRepository.delete({ email });

    await this.refreshTokenRepository.save({
      email,
      token_hash: tokenHash,
      expired_at: expiredDate,
    });
  }

  async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_TOKEN,
      });

      const user = await this.userRepository.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid format token');
      }

      const storedToken = await this.refreshTokenRepository.findOne({
        where: {
          email: user.email,
        },
      });

      if (!storedToken) {
        throw new UnauthorizedException('Invalid format token');
      }

      const isValidToken = await compare(refreshToken, storedToken.token_hash);
      const isExpired = new Date() > storedToken.expired_at;

      if (!isValidToken || isExpired) {
        await this.refreshTokenRepository.delete({ email: user.email });
        throw new UnauthorizedException('Access denied or token expired');
      }

      const tokens = await this.generateTokens(user);
      await this.saveRefreshToken(user.email, tokens.refresh_token);

      return tokens;
    } catch (err) {
      console.error('Refresh token error:', err);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(email: string): Promise<void> {
    await this.refreshTokenRepository.delete({ email });
  }
}
