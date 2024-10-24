import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Setting } from './setting.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class SettingService extends BaseService<Setting> {
  public entity: EntityTarget<Setting> = Setting;
  public repository: Repository<Setting> =
    this.dataSource.getRepository(Setting);
  constructor(private dataSource: DataSource) {
    super();
  }
}
