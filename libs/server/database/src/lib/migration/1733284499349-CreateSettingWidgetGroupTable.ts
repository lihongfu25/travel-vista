import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateSettingWidgetGroupTable1733284499349
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settingWidgetGroup',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'sort',
            type: 'int',
            default: 1,
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
      'settingWidgetGroup',
      new TableIndex({
        name: 'IDX_SETTING_WIDGET_GROUP_NAME',
        columnNames: ['name'],
      })
    );

    await queryRunner.createIndex(
      'settingWidgetGroup',
      new TableIndex({
        name: 'IDX_SETTING_WIDGET_GROUP_SORT',
        columnNames: ['sort'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settingWidgetGroup');
  }
}
