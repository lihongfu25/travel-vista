import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiResponseService,
  Auth,
  AuthenticatedUser,
  FindManyQueryParam,
} from '@server/common';
import { User } from '../user/user.entity';
import { MenuItemService } from './menu-item.service';
import { SelectQueryBuilder } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { MenuItemTransformer } from './menu-item.transformer';
import { FindMenuQueryParam } from './types';

@Controller('menu-item')
@ApiTags('Menu Item')
export class MenuItemController {
  constructor(
    private response: ApiResponseService,
    private menuItemService: MenuItemService
  ) {}

  @Get('menu-item-by-role')
  @Auth()
  async getMenuItemByRole(
    @AuthenticatedUser() user: User,
    @Query() param: FindManyQueryParam
  ) {
    const page = param.page ?? 1;
    const limit = param.limit ?? 20;
    const roleIds = await this.menuItemService.getUserRoles(user.id);
    if (!Array.isArray(roleIds) || roleIds.length === 0) {
      throw new BadRequestException('User does not have any role');
    }
    const roleIdsTranform = roleIds.map((role) => `"${role}"`);
    const query: SelectQueryBuilder<MenuItem> = this.menuItemService.repository
      .createQueryBuilder('menuItem')
      .leftJoin('menuItem.menus', 'menu')
      .leftJoinAndSelect('menuItem.children', 'children');
    if (roleIds) {
      query.andWhere(`menu.roleId IN (${roleIdsTranform.join(',')})`);
    }
    const result = await this.menuItemService.paginate(query, { page, limit });
    return this.response.paginate(result, MenuItemTransformer);
  }

  @Get('menu-item-by-name')
  async getMenuItemByMenuName(@Query() param: FindMenuQueryParam) {
    const query: SelectQueryBuilder<MenuItem> = this.menuItemService.repository
      .createQueryBuilder('menuItem')
      .leftJoin('menuItem.menus', 'menu')
      .leftJoinAndSelect('menuItem.children', 'children')
      .where('menu.name = :menuName', { menuName: param.menuName });
    const result = await query.getMany();
    return this.response.collection(result, MenuItemTransformer);
  }
}
