import { IsEnum, IsString } from 'class-validator';
import { BranchLocationType } from '../entities/branch.entity';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsEnum(BranchLocationType)
  type_location: BranchLocationType;

  @IsString()
  address: string;

  @IsString()
  province: string;

  @IsString()
  city: string;
}
