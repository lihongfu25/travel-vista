import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUserRoleTable1694959304224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userRole',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'roleId',
            type: 'varchar',
            length: '36',
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'userRole',
      new TableIndex({
        name: 'IDX_USER_ROLE_USER_ID',
        columnNames: ['userId'],
      })
    );

    await queryRunner.createIndex(
      'userRole',
      new TableIndex({
        name: 'IDX_USER_ROLE_ROLE_ID',
        columnNames: ['roleId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userRole');
  }
}
