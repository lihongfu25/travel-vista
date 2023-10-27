import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { ServerCommonModule } from '@server/common';

@Module({
  providers: [MenuItemService],
  controllers: [MenuItemController],
  imports: [ServerCommonModule],
})
export class MenuItemModule {}
