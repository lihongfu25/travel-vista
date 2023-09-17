import { MigrationInterface, QueryRunner } from 'typeorm';
import { districts } from '../assets/district.data';

export class DistrictTableSeeder1662794576610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = Object.values(districts).map((district) => ({
      name: district.name,
      nameWithType: district.name_with_type,
      slug: district.slug,
      type: district.type,
      code: district.code,
      path: district.path,
      pathWithType: district.path_with_type,
      parentCode: district.parent_code,
    }));

    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('district');
    for (const item of items) {
      const provines = await queryRunner.manager.query(
        `SELECT id FROM province WHERE code = "${item.parentCode}"`
      );
      await query
        .values({
          name: item.name,
          nameWithType: item.nameWithType,
          slug: item.slug,
          type: item.type,
          code: item.code,
          path: item.path,
          pathWithType: item.pathWithType,
          ...{ provineId: provines[0].id },
        })
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('district');
  }
}
