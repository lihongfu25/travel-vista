import { MigrationInterface, QueryRunner } from 'typeorm';
import { provinces } from '../assets/province.data';

export class ProvineTableSeeder1662793874358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = Object.values(provinces).map((province) => ({
      name: province.name,
      nameWithType: province.name_with_type,
      slug: province.slug,
      type: province.type,
      code: province.code,
    }));

    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('province');
    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('province');
  }
}
