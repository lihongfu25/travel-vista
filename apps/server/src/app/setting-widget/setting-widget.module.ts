import { Module } from '@nestjs/common';
import { ServerCommonModule } from '@server/common';
import { SettingWidgetGroupCommonService } from '../common/setting-widget-group-common/setting-widget-group-common.service';
import { SettingWidgetController } from './setting-widget.controller';
import { SettingWidgetService } from './setting-widget.service';

@Module({
  providers: [SettingWidgetService, SettingWidgetGroupCommonService],
  controllers: [SettingWidgetController],
  imports: [ServerCommonModule],
})
export class SettingWidgetModule {}
