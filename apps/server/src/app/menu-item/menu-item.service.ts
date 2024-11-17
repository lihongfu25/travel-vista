import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu-item.entity';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class MenuItemService extends BaseService<MenuItem> {
  public entity: EntityTarget<MenuItem> = MenuItem;
  public repository: Repository<MenuItem> =
    this.dataSource.getRepository(MenuItem);
  constructor(private dataSource: DataSource) {
    super();
  }

  async getUserRoles(userId: string): Promise<string[]> {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id: userId },
      relations: { roles: true },
    });

    return user.roles.map((role) => role.id);
  }

  async getLatestSortIndex(): Promise<number> {
    const latestMenuItem = await this.repository
      .createQueryBuilder('menuItem')
      .orderBy('menuItem.sort', 'DESC')
      .getOne();

    return latestMenuItem ? latestMenuItem.sort + 1 : 1;
  }

  async existsMenuItem(key: string, value: string): Promise<boolean> {
    const count = await this.repository.count({ where: { [key]: value } });
    return count > 0;
  }
}
