import {
  Body,
  Controller,
  Delete,
  Get,
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
} from '@server/common';
import { SettingService } from './setting.service';
import { ApiTags } from '@nestjs/swagger';
import { FindManySettingQueyryParam, SettingDto } from './types';
import { Setting } from './setting.entity';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import {
  SettingMinimalTransformer,
  SettingTransformer,
} from './setting.transformer';
import { SettingCategory } from './enums';

@Controller('setting')
@ApiTags('Setting')
export class SettingController {
  constructor(
    readonly response: ApiResponseService,
    readonly settingService: SettingService
  ) {}

  @Get()
  @Auth('superadmin', 'admin')
  async index(
    @Query() params: FindManySettingQueyryParam
  ): Promise<
    | ApiItemResponse<Setting>
    | ApiCollectionResponse<Setting>
    | ApiPaginateResponse<Setting>
  > {
    const limit = params.limit;
    const page = params.page;

    const query: SelectQueryBuilder<Setting> =
      this.settingService.repository.createQueryBuilder('setting');

    if (params.key) {
      query.andWhere('setting.key = :key', { key: params.key });
    }

    if (params.keyword) {
      query.andWhere(
        new Brackets((sqb) => {
          const searchPattern = `%${params.keyword}%`;
          sqb
            .where('setting.key LIKE :searchPattern', { searchPattern })
            .orWhere('setting.category LIKE :searchPattern', { searchPattern });
        })
      );
    }

    if (limit == 1) {
      const result = await query.getOne();
      return this.response.item(result, SettingTransformer);
    }

    if (limit < 0) {
      const result = await query.getMany();
      return this.response.collection(result, SettingTransformer);
    }

    const result = await this.settingService.paginate(query, { limit, page });
    return this.response.paginate(result, SettingTransformer);
  }

  @Get('login-gateway')
  async loginGateway(): Promise<ApiItemResponse<Array<string>>> {
    const setttings = await this.settingService.repository.find({
      where: { category: SettingCategory.LOGIN_GATEWAY },
    });
    const result = setttings
      .filter((i) => i.value === 'true')
      .map((i) => i.key);
    return this.response.item(result, Array<string>);
  }

  @Post()
  @Auth('superadmin', 'admin')
  async createOrUpdate(@Body() dto: SettingDto[]): Promise<ApiSuccessResponse> {
    for (const data of dto) {
      await this.settingService.createOrUpdate(
        {
          where: { key: data.key, category: data.category },
        },
        data
      );
    }
    return this.response.success();
  }

  @Put(':settingId')
  @Auth('superadmin', 'admin')
  async update(
    @Param('settingId') settingId: string,
    @Body() dto: SettingDto
  ): Promise<ApiItemResponse<Setting>> {
    const result = await this.settingService.update(settingId, dto);
    return this.response.item(result, SettingTransformer);
  }

  @Delete(':settingId')
  @Auth('superadmin', 'admin')
  async delete(
    @Param('settingId') settingId: string
  ): Promise<ApiSuccessResponse> {
    await this.settingService.destroy(settingId);
    return this.response.success();
  }
}
