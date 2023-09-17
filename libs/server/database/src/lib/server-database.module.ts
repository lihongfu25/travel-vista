import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '@server/configuration';

export interface SharedDatabaseConfigOption {
  entities: any[];
}
@Module({})
export class SharedDatabaseModule {
  static register(option: SharedDatabaseConfigOption): DynamicModule {
    return {
      module: SharedDatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          ...{
            type: environment.dbConnection || 'mysql',
            host: environment.dbHost,
            username: environment.dbUser,
            password: environment.dbPass,
            database: environment.dbName,
            port: environment.dbPort,
            synchronize: false,
            migrationsRun: environment?.migrationsRun || false,
            logging: environment?.dbLog || false,
            logger: 'file',
          },
          ...option,
        } as TypeOrmModuleOptions),
      ],
    };
  }
}
