import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateCommuneTable1694959617384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'commune',
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
            name: 'districtId',
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
      'commune',
      new TableIndex({
        name: 'IDX_COMMUNE_NAME',
        columnNames: ['name'],
      })
    );
    await queryRunner.createIndex(
      'commune',
      new TableIndex({
        name: 'IDX_COMMUNE_SLUG',
        columnNames: ['slug'],
      })
    );
    await queryRunner.createIndex(
      'commune',
      new TableIndex({
        name: 'IDX_COMMUNE_CODE',
        columnNames: ['code'],
      })
    );
    await queryRunner.createIndex(
      'commune',
      new TableIndex({
        name: 'IDX_COMMUNE_DISTRICT_ID',
        columnNames: ['districtId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('commune');
  }
}
