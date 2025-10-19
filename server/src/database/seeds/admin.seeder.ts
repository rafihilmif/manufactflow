import { DataSource } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { RoleEntity } from '../../roles/entities/role.entity';
import { RoleUserEntity } from '../../roles/entities/role.user.entity';
import { generateUniqueUID, UIDType } from '../../util/uid';

export class AdminSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const roleUserRepository = dataSource.getRepository(RoleUserEntity);

    const existAdmin = await userRepository.findOne({
      where: {
        email: 'blod@nornetics.com',
      },
    });

    if (existAdmin) {
      return;
    }

    let adminRole = await roleRepository.findOne({
      where: {
        name: 'admin',
      },
    });

    if (!adminRole) {
      const newRoleId = await generateUniqueUID(UIDType.ROLE, dataSource);
      console.log(newRoleId);

      await roleRepository.insert({
        role_id: newRoleId,
        name: 'admin',
        level: 3,
        created_at: new Date(),
      });

      adminRole = await roleRepository.findOne({
        where: { role_id: newRoleId },
      });

      if (!adminRole) {
        throw new Error('Failed to create admin role');
      }
    }

    const newUserId = await generateUniqueUID(UIDType.USER, dataSource);

    const newUser = userRepository.create({
      user_id: newUserId,
      email: 'blod@nornetics.com',
      password_hash: '@Nevada14045o',
      first_name: null,
      last_name: null,
      phone: null,
      department_id: null,
      manager_id: null,
      is_active: true,
      hire_date: new Date(),
    });

    const savedUser = await userRepository.save(newUser);

    if (!savedUser) {
      throw new Error('Failed to create admin user');
    }

    await roleUserRepository.insert({
      user_id: savedUser.user_id,
      role_id: adminRole.role_id,
    });

    console.log(`Admin seeding completed successfully!`);
  }
}
