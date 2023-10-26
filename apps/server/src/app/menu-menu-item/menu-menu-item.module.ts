import { Module } from '@nestjs/common';
import { MenuMenuItemService } from './menu-menu-item.service';

@Module({
  providers: [MenuMenuItemService],
})
export class MenuMenuItemModule {}
