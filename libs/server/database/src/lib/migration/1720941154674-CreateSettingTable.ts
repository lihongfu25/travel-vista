import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateSettingTable1720941154674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'setting',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'key',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'longtext',
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
      'setting',
      new TableIndex({
        name: 'IDX_SETTING_CATEGORY',
        columnNames: ['category'],
      })
    );
    await queryRunner.createIndex(
      'setting',
      new TableIndex({
        name: 'IDX_SETTING_KEY',
        columnNames: ['key'],
      })
    );
    await queryRunner.createIndex(
      'setting',
      new TableIndex({
        name: 'IDX_SETTING_VALUE',
        columnNames: ['value'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('setting');
  }
}
