import { Module } from '@nestjs/common';
import { SettingWidgetGroupService } from './setting-widget-group.service';
import { SettingWidgetGroupController } from './setting-widget-group.controller';
import { ServerCommonModule } from '@server/common';

@Module({
  providers: [SettingWidgetGroupService],
  controllers: [SettingWidgetGroupController],
  imports: [ServerCommonModule],
})
export class SettingWidgetGroupModule {}
