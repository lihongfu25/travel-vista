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
}
