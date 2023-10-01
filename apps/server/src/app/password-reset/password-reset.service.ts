import { Injectable } from '@nestjs/common';
import { PasswordReset } from './password-reset.entity';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository, UpdateResult } from 'typeorm';
import moment from 'moment';
@Injectable()
export class PasswordResetService extends BaseService<PasswordReset> {
  public entity: EntityTarget<PasswordReset> = PasswordReset;
  public repository: Repository<PasswordReset> =
    this.connection.getRepository(PasswordReset);

  constructor(private connection: Connection) {
    super();
  }

  async expire(token: string): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ expire: () => 'NOW()' })
      .where('token = :token', { token })
      .execute();
  }

  async expireAllToken(email: string): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ expire: () => 'NOW()' })
      .where('user = :email', { email })
      .andWhere('type = 1')
      .andWhere('expire >= NOW()')
      .execute();
  }

  async generate(
    email: string,
    token: string,
    expiresIn: number
  ): Promise<PasswordReset> {
    const expiresTime = moment()
      .add(expiresIn, 'milliseconds')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
    return this.create({
      user: email,
      token: token,
      expire: expiresTime,
    });
  }

  isExpired(entity: PasswordReset): boolean {
    const current_time = new Date();
    return current_time > new Date(entity.expire);
  }
}
