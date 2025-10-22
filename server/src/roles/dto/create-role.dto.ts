import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsNumber()
  @MinLength(1)
  @MaxLength(5)
  level: number;
}
