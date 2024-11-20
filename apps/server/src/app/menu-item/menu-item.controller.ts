import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
} from '@server/common';
import { Not, SelectQueryBuilder } from 'typeorm';
import { MenuCommonService } from '../common/menu-common/menu-common.service';
import { User } from '../user/user.entity';
import { MenuItem } from './menu-item.entity';
import { MenuItemService } from './menu-item.service';
import { MenuItemTransformer } from './menu-item.transformer';
import { FindMenuQueryParam, MenuItemDto, SortMenuItemDto } from './types';
import { MenuMenuItemService } from '../menu-menu-item/menu-menu-item.service';

@Controller('menu-item')
@ApiTags('Menu Item')
export class MenuItemController {
  constructor(
    private response: ApiResponseService,
    private menuItemService: MenuItemService,
    private menuCommonService: MenuCommonService,
    private menuMenuItemService: MenuMenuItemService
  ) {}

  @Get('my-menu')
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
      .leftJoinAndSelect('menuItem.children', 'children')
      .orderBy('menuItem.sort', 'ASC');
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
      .where('menu.name = :menuName', { menuName: param.menuName })
      .orderBy('menuItem.sort', 'ASC');
    const result = await query.getMany();
    return this.response.collection(result, MenuItemTransformer);
  }

  @Post()
  @Auth('superadmin', 'admin')
  async create(@Body() dto: MenuItemDto): Promise<ApiItemResponse<MenuItem>> {
    if (dto.menuId) {
      const menu = await this.menuCommonService.repository.findOne({
        where: { id: dto.menuId },
      });
      if (!menu) {
        throw new NotFoundException('menuPage.notification.error.notFound');
      }
    }

    if (dto.parentId) {
      const parent = await this.menuItemService.repository.findOne({
        where: { id: dto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          'menuItem.notification.error.parentNotFound'
        );
      }
    }

    if (
      await this.menuItemService.existsMenuItem('label', dto.label, dto.menuId)
    ) {
      throw new ConflictException('menuItem.notification.error.nameExists');
    }

    if (
      await this.menuItemService.existsMenuItem('link', dto.link, dto.menuId)
    ) {
      throw new ConflictException('menuItem.notification.error.linkExists');
    }

    const result = await this.menuItemService.create({
      ...dto,
      sort: await this.menuItemService.getLatestSortIndex(dto.menuId),
    });
    await this.menuMenuItemService.create({
      menuItemId: result.id,
      menuId: dto.menuId,
    });
    return this.response.item(result, MenuItemTransformer);
  }

  @Post('sort/menu/:menuId')
  @Auth('superadmin', 'admin')
  async sortMenuItem(
    @Param('menuId') menuId: number,
    @Body() dto: SortMenuItemDto[]
  ): Promise<ApiSuccessResponse> {
    const menu = await this.menuCommonService.repository.findOne({
      where: { id: menuId },
    });

    if (!menu) {
      throw new NotFoundException('menuPage.notification.error.notFound');
    }

    await this.menuItemService.sortMenuItems(menuId, dto);

    return this.response.success();
  }

  @Put(':menuItemId')
  @Auth('superadmin', 'admin')
  async update(
    @Param('menuItemId') menuItemId: number,
    @Body() dto: MenuItemDto
  ): Promise<ApiItemResponse<MenuItem>> {
    let menuItem = await this.menuItemService.repository.findOne({
      where: { label: dto.label, id: Not(menuItemId) },
    });
    if (menuItem) {
      throw new ConflictException('menuItem.notification.error.nameExists');
    }
    menuItem = await this.menuItemService.repository.findOne({
      where: { link: dto.link, id: Not(menuItemId) },
    });
    if (menuItem) {
      throw new ConflictException('menuItem.notification.error.linkExists');
    }
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
