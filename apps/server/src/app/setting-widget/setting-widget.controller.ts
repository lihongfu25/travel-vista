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
} from '@server/common';
import { Brackets, Not, SelectQueryBuilder } from 'typeorm';
import { SettingWidgetGroupCommonService } from '../common/setting-widget-group-common/setting-widget-group-common.service';
import { SettingWidget } from './setting-widget.entity';
import { SettingWidgetService } from './setting-widget.service';
import { SettingWidgetTransformer } from './setting-widget.transformer';
import { FindManySettingWidgetQueryParam, SettingWidgetDto } from './types';
import { ApiTags } from '@nestjs/swagger';

@Controller('setting-widget')
@ApiTags('Setting Widget')
export class SettingWidgetController {
  constructor(
    readonly response: ApiResponseService,
    readonly settingWidgetService: SettingWidgetService,
    readonly settingWidgetGroupCommonService: SettingWidgetGroupCommonService
  ) {}

  @Get()
  @Auth('superadmin', 'admin')
  async index(
    @Query() params: FindManySettingWidgetQueryParam
  ): Promise<
    | ApiItemResponse<SettingWidget>
    | ApiCollectionResponse<SettingWidget>
    | ApiPaginateResponse<SettingWidget>
  > {
    const limit = params.limit ?? DEFAULT_LIMIT_PER_PAGE;
    const page = params.page ?? 1;

    const query: SelectQueryBuilder<SettingWidget> =
      this.settingWidgetService.repository
        .createQueryBuilder('settingWidget')
        .leftJoinAndSelect(
          'settingWidget.settingWidgetGroup',
          'settingWidgetGroup'
        )
        .orderBy('settingWidget.sort', 'ASC');

    if (params.keyword) {
      query.andWhere(
        new Brackets((sqb) => {
          const searchPattern = `%${params.keyword}%`;
          sqb.where('settingWidget.name LIKE :searchPattern', {
            searchPattern,
          });
        })
      );
    }

    if (limit == 1) {
      const result = await query.getOne();
      return this.response.item(result, SettingWidgetTransformer);
    }

    if (limit < 0) {
      const result = await query.getMany();
      return this.response.collection(result, SettingWidgetTransformer);
    }

    const result = await this.settingWidgetService.paginate(query, {
      limit,
      page,
    });
    return this.response.paginate(result, SettingWidgetTransformer);
  }

  @Post('')
  @Auth('superadmin', 'admin')
  async create(@Body() dto: SettingWidgetDto): Promise<ApiSuccessResponse> {
    const settingWidgetGroup =
      this.settingWidgetGroupCommonService.repository.findOne({
        where: { id: dto.settingWidgetGroupId },
      });

    if (!settingWidgetGroup) {
      throw new NotFoundException(
        'settingWidgetGroup.notification.error.notFound'
      );
    }

    if (
      await this.settingWidgetService.existSettingWidget(
        'name',
        dto.name,
        dto.settingWidgetGroupId
      )
    ) {
      throw new ConflictException(
        'settingWidget.notification.error.nameExists'
      );
    }

    if (
      dto.sort &&
      (await this.settingWidgetService.existSettingWidget(
        'sort',
        dto.sort,
        dto.settingWidgetGroupId
      ))
    ) {
      await this.settingWidgetService.createSWGAndUpdateSort(dto);
    } else {
      await this.settingWidgetService.create({
        ...dto,
        sort:
          dto.sort ??
          (await this.settingWidgetService.getLatestSortIndex(
            dto.settingWidgetGroupId
          )),
      });
    }

    return this.response.success();
  }

  @Put(':settingWidgetId')
  @Auth('superadmin', 'admin')
  async update(
    @Body() dto: SettingWidgetDto,
    @Param('settingWidgetId') settingWidgetId: string
  ): Promise<ApiSuccessResponse> {
    const settingWidget = await this.settingWidgetService.repository.findOne({
      where: { id: settingWidgetId },
    });

    if (!settingWidget) {
      throw new NotFoundException('settingWidget.notification.error.notFound');
    }

    const settingWidgetGroup =
      this.settingWidgetGroupCommonService.repository.findOne({
        where: { id: dto.settingWidgetGroupId },
      });

    if (!settingWidgetGroup) {
      throw new NotFoundException(
        'settingWidgetGroup.notification.error.notFound'
      );
    }

    const settingWidgetByName =
      await this.settingWidgetService.repository.findOne({
        where: { name: dto.name, id: Not(settingWidgetId) },
      });

    if (settingWidgetByName) {
      throw new ConflictException(
        'settingWidget.notification.error.nameExists'
      );
    }

    const settingWidgetBySort =
      await this.settingWidgetService.repository.findOne({
        where: { sort: dto.sort, id: Not(settingWidgetId) },
      });

    if (settingWidgetBySort) {
      await this.settingWidgetService.updateSWGAndUpdateSort(
        settingWidgetId,
        dto
      );
    } else {
      await this.settingWidgetService.update(settingWidgetId, dto);
    }

    return this.response.success();
  }

  @Delete(':settingWidgetId')
  @Auth('superadmin')
  async delete(
    @Param('settingWidgetId') settingWidgetId: string
  ): Promise<ApiSuccessResponse> {
    await this.settingWidgetService.destroy(settingWidgetId);
    return this.response.success();
  }
}
