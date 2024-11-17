import { Injectable } from '@nestjs/common';
import { Menu } from '../../menu/menu.entity';
import { BaseService } from '@server/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class MenuCommonService extends BaseService<Menu> {
  public entity: EntityTarget<Menu> = Menu;
  public repository: Repository<Menu> = this.dataSource.getRepository(Menu);
  constructor(private dataSource: DataSource) {
    super();
  }
}
