import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { SettingWidgetGroup } from '../../setting-widget-group/setting-widget-group.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class SettingWidgetGroupCommonService extends BaseService<SettingWidgetGroup> {
  public entity: EntityTarget<SettingWidgetGroup> = SettingWidgetGroup;
  public repository: Repository<SettingWidgetGroup> =
    this.dataSource.getRepository(SettingWidgetGroup);
  constructor(private dataSource: DataSource) {
    super();
  }
}
