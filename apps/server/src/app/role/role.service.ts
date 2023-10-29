import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Role } from './role.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<Role> {
  public entity: EntityTarget<Role> = Role;
  public repository: Repository<Role> = this.dataSource.getRepository(Role);
  constructor(private dataSource: DataSource) {
    super();
  }
}
