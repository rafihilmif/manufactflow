import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BranchsService } from './branchs.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from '../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../middleware/guards/roles.guard';
import { Roles } from '../decorator/roles.decorator';

@Controller('branchs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BranchsController {
  constructor(private readonly branchsService: BranchsService) {}

  @Post('create')
  @Roles('admin', 'owner')
  async create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchsService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.branchsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchsService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchsService.remove(+id);
  }
}
