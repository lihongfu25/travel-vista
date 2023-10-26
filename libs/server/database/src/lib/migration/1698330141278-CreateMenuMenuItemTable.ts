import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMenuMenuItemTable1698330141278
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menuMenuItem',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'menuId',
            type: 'int',
          },
          {
            name: 'menuItemId',
            type: 'int',
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menuMenuItem');
  }
}
