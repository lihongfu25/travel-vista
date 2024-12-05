import { Module } from '@nestjs/common';
import { SettingWidgetGroupCommonService } from './setting-widget-group-common.service';

@Module({
  providers: [SettingWidgetGroupCommonService],
})
export class SettingWidgetGroupCommonModule {}
