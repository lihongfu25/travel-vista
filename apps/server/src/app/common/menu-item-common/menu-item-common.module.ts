import { Module } from '@nestjs/common';
import { MenuItemCommonService } from './menu-item-common.service';

@Module({
  providers: [MenuItemCommonService],
})
export class MenuItemCommonModule {}
