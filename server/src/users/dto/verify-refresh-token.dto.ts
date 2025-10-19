import { IsNotEmpty } from 'class-validator';

export class VerifyRefreshTokenDto {
  @IsNotEmpty()
  refresh_token: string;
}
