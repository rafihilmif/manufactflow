import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { DataSource, Repository } from 'typeorm';
import { BranchEntity } from './entities/branch.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { generateUniqueUID, UIDType } from '../util/uid.util';

@Injectable()
export class BranchsService {
  constructor(
    @InjectRepository(BranchEntity)
    private branchRepository: Repository<BranchEntity>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<BranchEntity> {
    const checkAvailable = await this.branchRepository.findOne({
      where: {
        name: createBranchDto.name,
        type_location: createBranchDto.type_location,
      },
    });

    if (checkAvailable) {
      throw new BadRequestException('Branch already exists');
    }

    const newBranchId = await generateUniqueUID(UIDType.BRANCH, this.dataSource);

    const locationCode = createBranchDto.type_location.slice(0, 3).toUpperCase();
    const provinceCode = createBranchDto.province.slice(0, 3).toUpperCase();
    const cityCode = createBranchDto.city.slice(0, 3).toUpperCase();
    const newCodeBranch = `${locationCode}-${provinceCode}-${cityCode}`;

    const branch = await this.branchRepository.create({
      ...createBranchDto,
      branch_id: newBranchId,
      code: newCodeBranch,
      is_active: true,
    });

    return await this.branchRepository.save(branch);
  }

  findAll() {
    return `This action returns all branchs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
