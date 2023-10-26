import { Injectable } from '@nestjs/common';
import { MenuMenuItem } from './menu-menu-item.entity';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class MenuMenuItemService extends BaseService<MenuMenuItem> {
  public entity: EntityTarget<MenuMenuItem> = MenuMenuItem;
  public repository: Repository<MenuMenuItem> =
    this.dataSource.getRepository(MenuMenuItem);
  constructor(private dataSource: DataSource) {
    super();
  }
}
