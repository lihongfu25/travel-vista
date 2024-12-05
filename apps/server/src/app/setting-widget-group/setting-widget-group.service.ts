import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { SettingWidgetGroup } from './setting-widget-group.entity';
import { SettingWidgetGroupDto } from './types';
import { SettingWidget } from '../setting-widget/setting-widget.entity';

@Injectable()
export class SettingWidgetGroupService extends BaseService<SettingWidgetGroup> {
  public entity: EntityTarget<SettingWidgetGroup> = SettingWidgetGroup;
  public repository: Repository<SettingWidgetGroup> =
    this.dataSource.getRepository(SettingWidgetGroup);

  constructor(private dataSource: DataSource) {
    super();
  }

  async getLatestSortIndex(): Promise<number> {
    const latestSettingWidgetGroup = await this.repository
      .createQueryBuilder('settingWidgetGroup')
      .orderBy('SettingWidgetGroup.sort', 'DESC')
      .getOne();

    return latestSettingWidgetGroup ? latestSettingWidgetGroup.sort + 1 : 1;
  }

  async existSettingWidgetGroup(key: string, value): Promise<boolean> {
    const count = await this.repository.count({ where: { [key]: value } });
    return count > 0;
  }

  async createSWGAndUpdateSort(dto: SettingWidgetGroupDto): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(SettingWidgetGroup)
        .set({ sort: () => 'sort + 1' })
        .where('sort >= :sort', { sort: dto.sort })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(SettingWidgetGroup)
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
    dto: SettingWidgetGroupDto
  ): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(SettingWidgetGroup)
        .set({ sort: () => 'sort + 1' })
        .where('sort >= :sort', { sort: dto.sort })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .update(SettingWidgetGroup)
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

  async deleteSWGAndSW(settingWidgetGroupId: string): Promise<void> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SettingWidget)
        .where('settingWidget.settingWidgetGroupId = :settingWidgetGroupId', {
          settingWidgetGroupId,
        })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SettingWidgetGroup)
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
