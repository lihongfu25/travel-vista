import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateMenuTable1698330122774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menu',
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
            name: 'roleId',
            type: 'varchar',
            length: '36',
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
      'menu',
      new TableIndex({
        name: 'IDX_MENU_NAME',
        columnNames: ['name'],
      })
    );
    await queryRunner.createIndex(
      'menu',
      new TableIndex({
        name: 'IDX_MENU_POSITION',
        columnNames: ['position'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menu');
  }
}
