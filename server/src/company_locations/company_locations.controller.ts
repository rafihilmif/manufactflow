import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyLocationsService } from './company_locations.service';
import { CreateCompanyLocationDto } from './dto/create-company_location.dto';
import { UpdateCompanyLocationDto } from './dto/update-company_location.dto';

@Controller('company-locations')
export class CompanyLocationsController {
  constructor(private readonly companyLocationsService: CompanyLocationsService) {}

  @Post()
  create(@Body() createCompanyLocationDto: CreateCompanyLocationDto) {
    return this.companyLocationsService.create(createCompanyLocationDto);
  }

  @Get()
  findAll() {
    return this.companyLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyLocationDto: UpdateCompanyLocationDto) {
    return this.companyLocationsService.update(+id, updateCompanyLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyLocationsService.remove(+id);
  }
}
