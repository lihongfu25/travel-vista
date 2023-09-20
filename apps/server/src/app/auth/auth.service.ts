import { Injectable } from '@nestjs/common';
import { BaseService, HashService } from '@server/common';
import { User } from '../user/user.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';

@Injectable()
export class AuthService extends BaseService<User> {
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.dataSource.getRepository(User);
  constructor(
    private dataSource: DataSource,
    private hashService: HashService
  ) {
    super();
  }
}
