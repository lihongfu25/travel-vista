import { Module } from '@nestjs/common';
import { ServerCommonModule } from '@server/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [ServerCommonModule],
})
export class MenuModule {}
