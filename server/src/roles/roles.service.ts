import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { DataSource, Repository } from 'typeorm';
import { generateUniqueUID, UIDType } from '../util/uid.util';
import { paginate } from '../util/pagination.util';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const checkAvailable = await this.roleRepository.findOne({
      where: {
        name: createRoleDto.name,
      },
    });

    if (checkAvailable) {
      throw new BadRequestException('Roles already exist');
    }

    const newRoleId = await generateUniqueUID(UIDType.ROLE, this.dataSource);
    const roles = await this.roleRepository.create({
      ...createRoleDto,
      role_id: newRoleId,
    });

    return this.roleRepository.save(roles);
  }

  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [data, total] = await this.roleRepository.findAndCount({
      order: { name: 'ASC' },
      skip: offset,
      take: limit,
    });

    return paginate(data, total, offset, limit);
  }

  async findById(roleId: string) {
    const data = await this.roleRepository.findOne({
      where: {
        role_id: roleId,
      },
    });

    if (!data) {
      throw new NotFoundException('Role data not found');
    }

    return data;
  }
}
