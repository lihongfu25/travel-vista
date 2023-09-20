import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiResponseService } from './http/api-response.service';
import { HashService } from './services';

@Module({
  imports: [ConfigModule],
  providers: [HashService, ApiResponseService],
  exports: [ApiResponseService, HashService],
})
export class ServerCommonModule {}
