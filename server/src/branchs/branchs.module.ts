import { Module } from '@nestjs/common';
import { BranchsService } from './branchs.service';
import { BranchsController } from './branchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity])],
  controllers: [BranchsController],
  providers: [BranchsService],
  exports: [BranchsService],
})
export class BranchsModule {}
