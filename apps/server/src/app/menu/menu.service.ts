import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Menu } from './menu.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class MenuService extends BaseService<Menu> {
  public entity: EntityTarget<Menu> = Menu;
  public repository: Repository<Menu> = this.dataSource.getRepository(Menu);
  constructor(private dataSource: DataSource) {
    super();
  }

  async isExistMenu(roleId: string): Promise<boolean> {
    return (
      (await this.repository
        .createQueryBuilder()
        .where('roleId = :roleId', { roleId })
        .getCount()) > 0
    );
  }
}
