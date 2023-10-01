import { Injectable } from '@nestjs/common';
import { BaseService, HashService } from '@server/common';
import { User } from '../user/user.entity';
import { DataSource, EntityTarget, Repository, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../role/role.entity';
import { UserRole } from '../user-role/user-role.entity';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '@server/configuration';

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

  async isExist(email: string): Promise<boolean> {
    return (
      (await this.repository
        .createQueryBuilder()
        .where('email = :email', { email })
        .getCount()) > 0
    );
  }

  async attachDefaultRole(user: User): Promise<User> {
    const defaultRole = await this.dataSource
      .getRepository(Role)
      .createQueryBuilder()
      .where('slug = :slug', { slug: 'user' })
      .getOne();
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserRole)
      .values({
        id: uuidv4(),
        userId: user.id,
        roleId: defaultRole.id,
      })
      .execute();
    return this.repository.findOne({
      where: { id: user.id },
      relations: ['roles'],
    });
  }

  async changePassword(
    userId: string,
    password: string
  ): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ password: this.hashService.hash(password) })
      .where('id = :id', { id: userId })
      .execute();
  }

  generateToken(user: User, expiresIn?: number): string {
    return this.jwtService.sign(
      {
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
      },
      { expiresIn: expiresIn ?? environment.jwtTtl }
    );
  }
}
