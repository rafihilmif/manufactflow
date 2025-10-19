import { Injectable } from '@nestjs/common';
import { CreateCompanyLocationDto } from './dto/create-company_location.dto';
import { UpdateCompanyLocationDto } from './dto/update-company_location.dto';

@Injectable()
export class CompanyLocationsService {
  create(createCompanyLocationDto: CreateCompanyLocationDto) {
    return 'This action adds a new companyLocation';
  }

  findAll() {
    return `This action returns all companyLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyLocation`;
  }

  update(id: number, updateCompanyLocationDto: UpdateCompanyLocationDto) {
    return `This action updates a #${id} companyLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyLocation`;
  }
}
