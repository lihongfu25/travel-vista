import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { User } from './user.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.dataSource.getRepository(User);

  constructor(private dataSource: DataSource) {
    super();
  }
}
