import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { User } from './user.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService extends BaseService<User> {
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.dataSource.getRepository(User);

  constructor(private dataSource: DataSource) {
    super();
  }

  findRoleByLevel(roleLevel: number): Promise<Role> {
    return this.dataSource
      .getRepository(Role)
      .createQueryBuilder('role')
      .where('role.level = :roleLevel', { roleLevel })
      .getOne();
  }

  // getUserByRoleLevelQuery(roleLevel: number): Promise<User[]> {
  //   return this.repository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.roles', 'role')
  //     .where('role.level = :roleLevel', { roleLevel })
  //     .getMany();
  // }
}
