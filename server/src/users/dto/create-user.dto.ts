import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEmpty()
  first_name: string;

  @IsEmpty()
  last_name: string;

  @IsEmpty()
  @MinLength(13)
  @MaxLength(15)
  phone: string;

  @IsEmpty()
  department: string;

  @IsOptional()
  photo: string;
}
