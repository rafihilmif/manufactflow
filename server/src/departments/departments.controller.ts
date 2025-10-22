import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { JwtAuthGuard } from '../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../middleware/guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';

@Controller('departments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('create')
  @Roles('admin', 'owner')
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Roles('admin')
  async findAll(@Query('page') page = 10, @Query('limit') limit = 10) {
    return this.departmentsService.findAll(Number(page), Number(limit));
  }

  @Get('detail/:department_id')
  @Roles('admin')
  async findById(@Param('department_id') departmentId: string) {
    return this.departmentsService.findById(departmentId);
  }
}
