import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
  AuthenticatedUser,
  FindManyQueryParam,
} from '@server/common';
import { User } from '../user/user.entity';
import { MenuItemService } from './menu-item.service';
import { SelectQueryBuilder } from 'typeorm';
import { MenuItem } from './menu-item.entity';
import { MenuItemTransformer } from './menu-item.transformer';
import { FindMenuQueryParam, MenuItemDto } from './types';

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
    @AuthenticatedUser() user: User
  ): Promise<ApiCollectionResponse<MenuItem>> {
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
    const result = await query.getMany();
    return this.response.collection(result, MenuItemTransformer);
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

  @Post()
  @Auth('superadmin', 'admin')
  async create(
    @Body() dto: MenuItemDto | MenuItemDto[]
  ): Promise<ApiItemResponse<MenuItem> | ApiCollectionResponse<MenuItem>> {
    if (Array.isArray(dto)) {
      const result: MenuItem[] = [];
      for (const data of dto) {
        result.push(await this.menuItemService.create(data));
      }
      return this.response.collection(result, MenuItemTransformer);
    } else {
      const result = await this.menuItemService.create(dto);
      return this.response.item(result, MenuItemTransformer);
    }
  }

  @Put(':menuItemId')
  @Auth('superadmin', 'admin')
  async update(
    @Param('menuItemId') menuItemId: number,
    @Body() dto: MenuItemDto
  ): Promise<ApiItemResponse<MenuItem>> {
    const result = await this.menuItemService.update(menuItemId, dto);
    return this.response.item(result, MenuItemTransformer);
  }

  @Delete(':menuItemId')
  @Auth('superadmin', 'admin')
  async destroy(
    @Param('menuItemId') menuItemId: number
  ): Promise<ApiSuccessResponse> {
    await this.menuItemService.destroy(menuItemId);
    return this.response.success();
  }
}
