import { ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../role/role.entity';
import { UserRole } from '../user-role/user-role.entity';
import { User } from './user.entity';
@Injectable()
export class UserService extends BaseService<User> {
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.dataSource.getRepository(User);

  constructor(private dataSource: DataSource) {
    super();
  }

  async isUniqueUsername(username: string): Promise<boolean> {
    return (
      (await this.repository
        .createQueryBuilder()
        .where('username = :username', { username })
        .getCount()) > 0
    );
  }

  async isUniqueEmail(username: string): Promise<boolean> {
    return (
      (await this.repository
        .createQueryBuilder()
        .where('username = :username', { username })
        .getCount()) > 0
    );
  }

  findRoleByLevel(roleLevel: number): Promise<Role> {
    return this.dataSource
      .getRepository(Role)
      .createQueryBuilder('role')
      .where('role.level = :roleLevel', { roleLevel })
      .getOne();
  }

  async attachDefaultRole(user: User): Promise<User> {
    const defaultRole = await this.dataSource
      .getRepository(Role)
      .createQueryBuilder()
      .where('slug = :slug', { slug: 'user' })
      .getOne();
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserRole)
      .values({
        id: uuidv4(),
        userId: user.id,
        roleId: defaultRole.id,
      })
      .execute();
    return this.repository.findOne({
      where: { id: user.id },
      relations: ['roles'],
    });
  }

  async addRoleToUser(userId: string, roleId: string): Promise<User> {
    const user = await this.repository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('user.roles', 'role')
      .getOne();

    const role = await this.dataSource
      .getRepository(Role)
      .createQueryBuilder()
      .where('id = :id', { id: roleId })
      .getOne();

    if (user) {
      user.roles.map((role) => {
        if (role.id === roleId) {
          throw new ConflictException('Role đã tồn tại');
        }
      });
    }
    user.roles = [...user.roles, ...[role]];
    return this.repository.save(user);
  }
}
