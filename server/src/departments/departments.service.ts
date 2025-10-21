import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { DataSource, Repository } from 'typeorm';
import { generateUniqueUID, UIDType } from '../util/uid.util';
import { paginate } from '../util/pagination.util';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    const checkAvailable = await this.departmentRepository.findOne({
      where: {
        name: createDepartmentDto.name,
      },
    });

    if (checkAvailable) {
      throw new BadRequestException('Department already exist');
    }

    const newDepartmentId = await generateUniqueUID(UIDType.DEPARTMENT, this.dataSource);
    const department = await this.departmentRepository.create({
      ...createDepartmentDto,
      department_id: newDepartmentId,
      is_active: true,
    });

    return await this.departmentRepository.save(department);
  }

  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [data, total] = await this.departmentRepository.findAndCount({
      order: { name: 'ASC' },
      skip: offset,
      take: limit,
    });

    return paginate(data, total, offset, limit);
  }

  async findById(departmentId: string): Promise<DepartmentEntity> {
    const data = await this.departmentRepository.findOne({
      where: {
        department_id: departmentId,
      },
    });

    if (!data) {
      throw new NotFoundException(`Department data not found`);
    }

    return data;
  }
}
