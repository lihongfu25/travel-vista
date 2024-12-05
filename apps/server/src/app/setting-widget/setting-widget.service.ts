import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { SettingWidget } from './setting-widget.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { SettingWidgetDto } from './types';

@Injectable()
export class SettingWidgetService extends BaseService<SettingWidget> {
  public entity: EntityTarget<SettingWidget> = SettingWidget;
  public repository: Repository<SettingWidget> =
    this.dataSource.getRepository(SettingWidget);
  constructor(private dataSource: DataSource) {
    super();
  }

  async getLatestSortIndex(settingWidgetGroupId: string): Promise<number> {
    const latestSettingWidgetGroup = await this.repository
      .createQueryBuilder('settingWidgetGroup')
      .where(
        'settingWidgetGroup.settingWidgetGroupId = :settingWidgetGroupId',
        {
          settingWidgetGroupId,
        }
      )
      .orderBy('SettingWidgetGroup.sort', 'DESC')
      .getOne();

    return latestSettingWidgetGroup ? latestSettingWidgetGroup.sort + 1 : 1;
  }

  async existSettingWidget(
    key: string,
    value,
    settingWidgetGroupId: string
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: { settingWidgetGroupId, [key]: value },
    });
    return count > 0;
  }

  async createSWGAndUpdateSort(dto: SettingWidgetDto): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(SettingWidget)
        .set({ sort: () => 'sort + 1' })
        .where('sort >= :sort', { sort: dto.sort })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(SettingWidget)
        .values({ ...dto })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateSWGAndUpdateSort(
    settingWidgetGroupId: string,
    dto: SettingWidgetDto
  ): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(SettingWidget)
        .set({ sort: () => 'sort + 1' })
        .where('sort >= :sort', { sort: dto.sort })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .update(SettingWidget)
        .set({ ...dto })
        .where('id = :settingWidgetGroupId', { settingWidgetGroupId })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
