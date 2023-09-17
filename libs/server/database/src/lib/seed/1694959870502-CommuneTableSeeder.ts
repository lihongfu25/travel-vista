import { MigrationInterface, QueryRunner } from 'typeorm';
import { communes } from '../assets/commune.data';

export class CommuneTableSeeder1662795220623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = Object.values(communes).map((commune) => ({
      name: commune.name,
      nameWithType: commune.name_with_type,
      slug: commune.slug,
      type: commune.type,
      code: commune.code,
      path: commune.path,
      pathWithType: commune.path_with_type,
      parentCode: commune.parent_code,
    }));

    const query = queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('commune');
    for (const item of items) {
      const districts = await queryRunner.manager.query(
        `SELECT id FROM district WHERE code = "${item.parentCode}"`
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
          ...{ districtId: districts[0].id },
        })
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('commune');
  }
}
