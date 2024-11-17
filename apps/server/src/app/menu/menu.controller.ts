import {
  Body,
  ConflictException,
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
  FindManyQueryParam,
} from '@server/common';
import { Brackets, Not, SelectQueryBuilder } from 'typeorm';
import { Menu } from './menu.entity';
import { MenuService } from './menu.service';
import { MenuTransformer } from './menu.transformer';
import { CreateMenuDto, UpdateMenuDto } from './types';
import { MenuItemCommonService } from '../common/menu-item-common/menu-item-common.service';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(
    private menuService: MenuService,
    private response: ApiResponseService,
    private menuItemCommonService: MenuItemCommonService
  ) {}

  @Get()
  @Auth('superadmin', 'admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiCollectionResponse<Menu>> {
    const page = param.page ?? 1;
    const limit = param.limit ?? 20;
    const query: SelectQueryBuilder<Menu> = this.menuService.repository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.role', 'role')
      .leftJoinAndSelect('menu.menuItems', 'menuItems');

    if (param.keyword) {
      query.andWhere(
        new Brackets((sqb) => {
          const searchPattern = `%${param.keyword}%`;
          sqb.where('menu.name LIKE :searchPattern', { searchPattern });
        })
      );
    }

    const result = await this.menuService.paginate(query, { page, limit });
    return this.response.paginate(result, MenuTransformer);
  }

  @Get('/:menuId(\\d+)')
  @Auth('superadmin', 'admin')
  async show(@Param('menuId') menuId: number): Promise<ApiItemResponse<Menu>> {
    const result = await this.menuService.repository
      .createQueryBuilder('menu')
      .where('menu.id = :menuId', { menuId })
      .leftJoinAndSelect('menu.menuItems', 'menuItem')
      .leftJoinAndSelect('menuItem.children', 'children')
      .orderBy('menuItem.sort', 'ASC')
      .addOrderBy('children.sort', 'ASC')
      .getOne();
    return this.response.item(result, MenuTransformer);
  }

  @Post()
  @Auth('superadmin', 'admin')
  async create(@Body() dto: CreateMenuDto): Promise<ApiItemResponse<Menu>> {
    if (
      dto.roleId &&
      (await this.menuService.existsMenu('roleId', dto.roleId))
    ) {
      throw new ConflictException('menuPage.notification.error.roleExists');
    }
    if (await this.menuService.existsMenu('name', dto.name)) {
      throw new ConflictException('menuPage.notification.error.nameExists');
    }
    const result = await this.menuService.create(dto);
    return this.response.item(result, MenuTransformer);
  }

  @Put(':menuId')
  @Auth('superadmin', 'admin')
  async update(
    @Param('menuId') menuId: number,
    @Body() dto: UpdateMenuDto
  ): Promise<ApiItemResponse<Menu>> {
    const menu = await this.menuService.repository.findOne({
      where: { name: dto.name, id: Not(menuId) },
    });
    if (menu) {
      throw new ConflictException('menuPage.notification.error.nameExists');
    }
    const result = await this.menuService.update(menuId, dto);
    return this.response.item(result, MenuTransformer);
  }

  @Delete(':menuId')
  @Auth('superadmin', 'admin')
  async destroy(@Param('menuId') menuId: number): Promise<ApiSuccessResponse> {
    await this.menuService.destroy(menuId);
    await this.menuItemCommonService.destroyAllMenuItemsByMenu(menuId);
    return this.response.success();
  }
}
