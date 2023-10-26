import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateMenuItemTable1698330134703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menuItem',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'label',
            type: 'varchar',
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sort',
            default: 0,
            type: 'int',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'parentId',
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
      'menuItem',
      new TableIndex({
        name: 'IDX_MENU_ITEM_PARENT_ID',
        columnNames: ['parentId'],
      })
    );
    await queryRunner.createIndex(
      'menuItem',
      new TableIndex({
        name: 'IDX_MENU_ITEM_SORT',
        columnNames: ['sort'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menuItem');
  }
}
