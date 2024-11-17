import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { ServerCommonModule } from '@server/common';
import { MenuCommonService } from '../common/menu-common/menu-common.service';
import { MenuMenuItemService } from '../menu-menu-item/menu-menu-item.service';

@Module({
  providers: [MenuItemService, MenuCommonService, MenuMenuItemService],
  controllers: [MenuItemController],
  imports: [ServerCommonModule],
})
export class MenuItemModule {}
