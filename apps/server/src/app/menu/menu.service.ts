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

  async existsMenu(key: string, value: string): Promise<boolean> {
    const count = await this.repository.count({ where: { [key]: value } });
    return count > 0;
  }
}
