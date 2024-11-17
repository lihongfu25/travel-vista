import { Module } from '@nestjs/common';
import { MenuCommonService } from './menu-common.service';

@Module({
  providers: [MenuCommonService],
})
export class MenuCommonModule {}
