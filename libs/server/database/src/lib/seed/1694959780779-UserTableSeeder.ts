import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const enum UserStatus {
  ACTIVE = 1,
}

export class UserTableSeeder1649669979240 implements MigrationInterface {
  private saltRounds = 10;
  private hash(data: string): string {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(this.saltRounds));
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        email: 'superadmin@app.com.vn',
        username: 'superadmin',
        password: this.hash('secret'),
        role: ['superadmin', 'admin'],
        phoneNumber: '0123456788',
        status: UserStatus.ACTIVE,
        loginFailed: 0,
      },
      {
        email: 'admin@app.com.vn',
        username: 'admin',
        password: this.hash('secret'),
        role: ['admin'],
        phoneNumber: '0123456788',
        status: UserStatus.ACTIVE,
        loginFailed: 0,
      },
      {
        email: 'user@app.com.vn',
        username: 'user',
        password: this.hash('secret'),
        role: ['user'],
        phoneNumber: '0123456787',
        image: '',
        status: UserStatus.ACTIVE,
        loginFailed: 0,
      },
    ];
    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user');

    const roles = await queryRunner.query('SELECT * from role');

    for (const item of items) {
      const id = uuidv4();
      await query
        .values({
          ...{ id },
          username: item.username,
          email: item.email,
          password: item.password,
          status: item.status,
          image: item.image,
          phoneNumber: item.phoneNumber,
        })
        .execute();
      const role = roles.filter((r: any) => item.role.includes(r.slug));
      const roleQuery = queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('userRole');
      for (const r of role) {
        await roleQuery
          .values({ id: uuidv4(), userId: id, roleId: r.id })
          .execute();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('user');
    await queryRunner.clearTable('userRole');
  }
}
