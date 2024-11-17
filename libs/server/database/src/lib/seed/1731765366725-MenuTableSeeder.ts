import { MigrationInterface, QueryRunner } from 'typeorm';

export class MenuTableSeeder1731765366725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const role = await queryRunner.query(
      'SELECT * FROM role WHERE slug = "admin"'
    );

    const items = [{ name: 'Admin Menu', roleId: role[0].id }];

    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('menu');
    let id = 1;
    for (const item of items) {
      await query.values({ ...{ id }, ...item }).execute();
      id++;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('menu');
  }
}
