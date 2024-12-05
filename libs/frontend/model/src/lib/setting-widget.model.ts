import { plainToInstance, Transform, Type } from 'class-transformer';
import { SettingWidgetGroup } from './setting-widget-group.model';

export class SettingWidget {
  id!: string;

  settingWidgetGroupId!: string;
  name!: string;
  description!: string;
  link!: string;
  icon!: string;
  sort!: number;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => SettingWidgetGroup)
  @Transform(({ value }) => plainToInstance(SettingWidgetGroup, value))
  settingWidgetGroup!: SettingWidgetGroup;
}
