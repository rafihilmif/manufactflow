import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from '../decorator/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  @Roles('admin', 'owner')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('admin', 'owner')
  async findAll(@Query('page') page = 10, @Query('limit') limit = 10) {
    return this.rolesService.findAll(Number(page), Number(limit));
  }

  @Get('detail/:role_id')
  @Roles('admin', 'owner')
  findOne(@Param('role_id') roleId: string) {
    return this.rolesService.findById(roleId);
  }
}
