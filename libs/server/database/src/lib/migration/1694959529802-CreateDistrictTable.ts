import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateDistrictTable1694959529802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'district',
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
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'pathWithType',
            type: 'varchar',
          },
          {
            name: 'provineId',
            type: 'int',
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
      'district',
      new TableIndex({
        name: 'IDX_DISTRICT_NAME',
        columnNames: ['name'],
      })
    );
    await queryRunner.createIndex(
      'district',
      new TableIndex({
        name: 'IDX_DISTRICT_SLUG',
        columnNames: ['slug'],
      })
    );
    await queryRunner.createIndex(
      'district',
      new TableIndex({
        name: 'IDX_DISTRICT_CODE',
        columnNames: ['code'],
      })
    );
    await queryRunner.createIndex(
      'district',
      new TableIndex({
        name: 'IDX_DISTRICT_PROVINE_ID',
        columnNames: ['provineId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('district');
  }
}
