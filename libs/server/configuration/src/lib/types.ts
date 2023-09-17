export const SERVER_CONFIGURATION = 'SERVER_CONFIGURATION';

export interface ServerConfigurationInterface {
  production: boolean;
  appUrl: string;
  pdfAppUrl: string;
  pdfAppSecureUrl: string;
  appKey: string;
  jwtTtl: number;
  dbLog: boolean;
  migrationsRun: boolean;
  dbConnection: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
  pdfUploadPath: string;
}
