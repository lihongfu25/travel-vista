import { Module } from '@nestjs/common';
import { ServerCommonModule } from '@server/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuItemCommonService } from '../common/menu-item-common/menu-item-common.service';

@Module({
  providers: [MenuService, MenuItemCommonService],
  controllers: [MenuController],
  imports: [ServerCommonModule],
})
export class MenuModule {}
