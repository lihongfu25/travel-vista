import { Module } from '@nestjs/common';
import { ApiResponseService } from './http/api-response.service';
import { HashService } from './services';

@Module({
  controllers: [],
  providers: [HashService, ApiResponseService],
  exports: [],
})
export class ServerCommonModule {}
