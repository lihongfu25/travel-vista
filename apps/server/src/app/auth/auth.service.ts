import { Injectable } from '@nestjs/common';
import { BaseService, HashService } from '@server/common';
import { User } from '../user/user.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends BaseService<User> {
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.dataSource.getRepository(User);
  constructor(
    private dataSource: DataSource,
    private hashService: HashService,
    private jwtService: JwtService
  ) {
    super();
  }

  async increaseLoginFailed(userId: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        loginFailed: () => 'loginFailed + 1',
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  async resetLoginFailed(userId: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ loginFailed: 0 })
      .where('id = :userId', { userId })
      .execute();
  }

  generateToken(user: User): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      verified: user.verified,
      ...{
        role:
          Array.isArray(user.roles) && user.roles.length > 0
            ? user.roles.map((item) => item.slug).join(',')
            : '',
      },
    });
  }
}
