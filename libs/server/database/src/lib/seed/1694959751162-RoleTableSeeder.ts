import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
export class RoleTableSeeder1649669445031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { name: 'Admin', slug: 'admin', level: 1 },
      { name: 'User', slug: 'user', level: 2 },
    ];
    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role');
    for (const item of items) {
      await query.values({ ...{ id: uuidv4() }, ...item }).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('role');
  }
}
