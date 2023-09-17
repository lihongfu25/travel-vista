import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUserTable1694958928565 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isGenerated: false,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            default: 1,
            type: 'int',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'verifyToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'verified',
            type: 'boolean',
            default: 0,
          },
          {
            name: 'verifiedAt',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'loginFailed',
            type: 'int',
            default: 0,
          },
          {
            name: 'deletedAt',
            type: 'datetime',
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
      'user',
      new TableIndex({
        name: 'IDX_USER_ID',
        columnNames: ['id'],
      })
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
      })
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_USERNAME',
        columnNames: ['username'],
      })
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_FIRST_NAME',
        columnNames: ['firstName'],
      })
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_LAST_NAME',
        columnNames: ['lastName'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
