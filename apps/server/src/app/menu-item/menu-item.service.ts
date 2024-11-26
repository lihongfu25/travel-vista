import { Injectable } from '@nestjs/common';
import { MenuItem } from './menu-item.entity';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, In, QueryRunner, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { MenuMenuItem } from '../menu-menu-item/menu-menu-item.entity';
import { SortMenuItemDto } from './types';
import { isArray } from 'lodash';

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

  async getLatestSortIndex(menuId: number): Promise<number> {
    const latestMenuItem = await this.repository
      .createQueryBuilder('menuItem')
      .leftJoinAndSelect('menuItem.menus', 'menu')
      .where('menu.id = :menuId', { menuId })
      .orderBy('menuItem.sort', 'DESC')
      .getOne();

    return latestMenuItem ? latestMenuItem.sort + 1 : 1;
  }

  async existsMenuItem(
    key: string,
    value: string,
    menuId: number
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: { [key]: value, menus: { id: menuId } },
      relations: { menus: true },
    });
    return count > 0;
  }

  async createMenuItems(
    queryRunner: QueryRunner,
    menuId: number,
    { label, link, icon, parentId, children }: SortMenuItemDto,
    currentSort = 0
  ) {
    currentSort++;
    const res = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(MenuItem)
      .values({
        label,
        link,
        icon,
        parentId,
        sort: currentSort,
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(MenuMenuItem)
      .values({
        menuId,
        menuItemId: res.identifiers[0].id,
      })
      .execute();

    if (isArray(children) && children.length > 0) {
      for (const child of children) {
        currentSort = await this.createMenuItems(
          queryRunner,
          menuId,
          {
            ...child,
            parentId: res.identifiers[0].id,
          },
          currentSort
        );
      }
    }

    return currentSort;
  }

  async sortMenuItems(menuId: number, items: SortMenuItemDto[]): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const menuMenuItems = await queryRunner.manager.find(MenuMenuItem, {
        where: { menuId },
      });
      await queryRunner.manager.delete(MenuItem, {
        id: In(menuMenuItems.map((item) => item.menuItemId)),
      });
      await queryRunner.manager.delete(MenuMenuItem, { menuId });

      let currentSort = 0;
      for (const item of items) {
        currentSort = await this.createMenuItems(
          queryRunner,
          menuId,
          item,
          currentSort
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteMenuItem(menuItemId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(MenuMenuItem, { menuItemId });
      await queryRunner.manager.delete(MenuItem, { parentId: menuItemId });
      await queryRunner.manager.delete(MenuItem, { id: menuItemId });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
