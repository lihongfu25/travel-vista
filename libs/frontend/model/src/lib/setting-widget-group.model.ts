import { plainToInstance, Transform, Type } from 'class-transformer';
import { SettingWidget } from './setting-widget.model';

export class SettingWidgetGroup {
  id!: string;
  name!: string;
  sort!: number;
  createdAt!: Date;
  updatedAt!: Date;
  @Type(() => SettingWidget)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: SettingWidget) => plainToInstance(SettingWidget, item))
      : []
  )
  settingWidgets!: SettingWidget[];
}
