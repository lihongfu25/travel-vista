import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateSettingWidgetTable1733284697564
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settingWidget',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'settingWidgetGroupId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'link',
            type: 'varchar',
          },
          {
            name: 'icon',
            type: 'longtext',
            isNullable: true,
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
      'settingWidget',
      new TableIndex({
        name: 'IDX_SETTING_WIDGET_NAME',
        columnNames: ['name'],
      })
    );

    await queryRunner.createIndex(
      'settingWidget',
      new TableIndex({
        name: 'IDX_SETTING_WIDGET_LINK',
        columnNames: ['link'],
      })
    );

    await queryRunner.createIndex(
      'settingWidget',
      new TableIndex({
        name: 'IDX_SETTING_WIDGET_SETTING_WIDGET_GROUP_ID',
        columnNames: ['settingWidgetGroupId'],
      })
    );

    await queryRunner.createForeignKey(
      'settingWidget',
      new TableForeignKey({
        columnNames: ['settingWidgetGroupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'settingWidgetGroup',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settingWidget');
  }
}
