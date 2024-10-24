import { MigrationInterface, QueryRunner } from 'typeorm';
import { settings } from '../assets/setting.data';
import { v4 as uuidv4 } from 'uuid';

export class SettingTableSeeder1720941806002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = Object.values(settings).map((setting) => ({
      id: uuidv4(),
      key: setting.key,
      value: setting.value,
      category: setting.category,
    }));

    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('setting');
    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('setting');
  }
}
