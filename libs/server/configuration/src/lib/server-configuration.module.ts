import { Module } from '@nestjs/common';
import { SERVER_CONFIGURATION } from './types';
import { environment } from './environments/environment';

@Module({
  controllers: [],
  providers: [{ provide: SERVER_CONFIGURATION, useValue: environment }],
  exports: [SERVER_CONFIGURATION],
})
export class ServerConfigurationModule {}
