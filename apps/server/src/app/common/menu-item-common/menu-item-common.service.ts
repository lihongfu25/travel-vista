import { Injectable } from '@nestjs/common';
import { MenuItem } from '../../menu-item/menu-item.entity';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { MenuMenuItem } from '../../menu-menu-item/menu-menu-item.entity';

@Injectable()
export class MenuItemCommonService extends BaseService<MenuItem> {
  public entity: EntityTarget<MenuItem> = MenuItem;
  public repository: Repository<MenuItem> =
    this.dataSource.getRepository(MenuItem);
  constructor(private dataSource: DataSource) {
    super();
  }

  async destroyAllMenuItemsByMenu(menuId: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(MenuMenuItem)
      .where('menuId = :menuId', { menuId })
      .execute();

    const menuItemsToRemove = await this.repository
      .createQueryBuilder('menuItem')
      .where(
        'menuItem.id NOT IN (SELECT menuMenuItem.menuItemId FROM menuMenuItem)'
      )
      .getMany();

    for (const menuItem of menuItemsToRemove) {
      await this.repository.remove(menuItem);
    }
  }
}
