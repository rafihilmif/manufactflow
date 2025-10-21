import { IsEnum, IsString } from 'class-validator';

export enum DepartmentType {
  PRODUCTION = 'production',
  WAREHOUSE = 'warehouse',
  FINANCE = 'finance',
  SALES = 'sales',
}
export class CreateDepartmentDto {
  @IsString()
  name: string;

  @IsString()
  cost_center_code: string;
}
