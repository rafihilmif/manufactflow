import { Module } from '@nestjs/common';
import { CompanyLocationsService } from './company_locations.service';
import { CompanyLocationsController } from './company_locations.controller';

@Module({
  controllers: [CompanyLocationsController],
  providers: [CompanyLocationsService],
})
export class CompanyLocationsModule {}
