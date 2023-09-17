import { environment } from '../../../configuration/src/lib/environments/environment';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSource = new DataSource({
  type: environment.dbConnection || 'mysql',
  host: environment.dbHost,
  username: environment.dbUser,
  password: environment.dbPass,
  database: environment.dbName,
  port: environment.dbPort,
  migrations: ['libs/server/database/src/lib/seed/**/*.ts'],
  migrationsTableName: 'seeds',
} as DataSourceOptions);
