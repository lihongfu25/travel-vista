import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateProvinceTable1694959379646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'province',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'nameWithType',
            type: 'varchar',
          },
          {
            name: 'slug',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'countryId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'province',
      new TableIndex({
        name: 'IDX_PROVINE_NAME',
        columnNames: ['name'],
      })
    );
    await queryRunner.createIndex(
      'province',
      new TableIndex({
        name: 'IDX_PROVINE_SLUG',
        columnNames: ['slug'],
      })
    );
    await queryRunner.createIndex(
      'province',
      new TableIndex({
        name: 'IDX_PROVINE_CODE',
        columnNames: ['code'],
      })
    );
    await queryRunner.createIndex(
      'province',
      new TableIndex({
        name: 'IDX_PROVINE_COUNTRY_ID',
        columnNames: ['countryId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('province');
  }
}
