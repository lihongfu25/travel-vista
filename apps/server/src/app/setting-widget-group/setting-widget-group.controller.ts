import {
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
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
  DEFAULT_LIMIT_PER_PAGE,
  FindManyQueryParam,
} from '@server/common';
import { SettingWidgetGroupService } from './setting-widget-group.service';
import { SettingWidgetGroupDto } from './types';
import { Brackets, Not, SelectQueryBuilder } from 'typeorm';
import { SettingWidgetGroup } from './setting-widget-group.entity';
import { SettingWidgetGroupTransformer } from './setting-widget-group.transformer';
import { ApiTags } from '@nestjs/swagger';

@Controller('setting-widget-group')
@ApiTags('Setting Widget Group')
export class SettingWidgetGroupController {
  constructor(
    readonly response: ApiResponseService,
    readonly settingWidgetGroupService: SettingWidgetGroupService
  ) {}

  @Get()
  @Auth('superadmin', 'admin')
  async index(
    @Query() params: FindManyQueryParam
  ): Promise<
    | ApiItemResponse<SettingWidgetGroup>
    | ApiCollectionResponse<SettingWidgetGroup>
    | ApiPaginateResponse<SettingWidgetGroup>
  > {
    const limit = params.limit ?? DEFAULT_LIMIT_PER_PAGE;
    const page = params.page ?? 1;

    const query: SelectQueryBuilder<SettingWidgetGroup> =
      this.settingWidgetGroupService.repository
        .createQueryBuilder('settingWidgetGroup')
        .leftJoinAndSelect('settingWidgetGroup.settingWidgets', 'settingWidget')
        .orderBy('settingWidgetGroup.sort', 'ASC')
        .addOrderBy('settingWidget.sort', 'ASC');

    if (params.keyword) {
      query.andWhere(
        new Brackets((sqb) => {
          const searchPattern = `%${params.keyword}%`;
          sqb.where('settingWidgetGroup.name LIKE :searchPattern', {
            searchPattern,
          });
        })
      );
    }

    if (limit == 1) {
      const result = await query.getOne();
      return this.response.item(result, SettingWidgetGroupTransformer);
    }

    if (limit < 0) {
      const result = await query.getMany();
      return this.response.collection(result, SettingWidgetGroupTransformer);
    }

    const result = await this.settingWidgetGroupService.paginate(query, {
      limit,
      page,
    });
    return this.response.paginate(result, SettingWidgetGroupTransformer);
  }

  @Post('')
  @Auth('superadmin')
  async create(
    @Body() dto: SettingWidgetGroupDto
  ): Promise<ApiSuccessResponse> {
    if (
      await this.settingWidgetGroupService.existSettingWidgetGroup(
        'name',
        dto.name
      )
    ) {
      throw new ConflictException(
        'settingWidgetGroup.notification.error.nameExists'
      );
    }

    if (
      dto.sort &&
      (await this.settingWidgetGroupService.existSettingWidgetGroup(
        'sort',
        dto.sort
      ))
    ) {
      await this.settingWidgetGroupService.createSWGAndUpdateSort(dto);
    } else {
      await this.settingWidgetGroupService.create({
        ...dto,
        sort:
          dto.sort ??
          (await this.settingWidgetGroupService.getLatestSortIndex()),
      });
    }

    return this.response.success();
  }

  @Put(':settingWidgetGroupId')
  @Auth('superadmin', 'admin')
  async update(
    @Body() dto: SettingWidgetGroupDto,
    @Param('settingWidgetGroupId') settingWidgetGroupId: string
  ): Promise<ApiSuccessResponse> {
    const settingWidgetGroup =
      await this.settingWidgetGroupService.repository.findOne({
        where: { id: settingWidgetGroupId },
      });

    if (!settingWidgetGroup) {
      throw new NotFoundException(
        'settingWidgetGroup.notification.error.notFound'
      );
    }

    const settingWidgetGroupByName =
      await this.settingWidgetGroupService.repository.findOne({
        where: { name: dto.name, id: Not(settingWidgetGroupId) },
      });

    if (settingWidgetGroupByName) {
      throw new ConflictException(
        'settingWidgetGroup.notification.error.nameExists'
      );
    }

    const settingWidgetGroupBySort =
      await this.settingWidgetGroupService.repository.findOne({
        where: { sort: dto.sort, id: Not(settingWidgetGroupId) },
      });

    if (settingWidgetGroupBySort) {
      await this.settingWidgetGroupService.updateSWGAndUpdateSort(
        settingWidgetGroupId,
        dto
      );
    } else {
      await this.settingWidgetGroupService.update(settingWidgetGroupId, dto);
    }

    return this.response.success();
  }

  @Delete(':settingWidgetGroupId')
  @Auth('superadmin')
  async delete(
    @Param('settingWidgetGroupId') settingWidgetGroupId: string
  ): Promise<ApiSuccessResponse> {
    await this.settingWidgetGroupService.deleteSWGAndSW(settingWidgetGroupId);
    return this.response.success();
  }
}
