import { plainToInstance, Transform, Type } from 'class-transformer';
import { SettingWidgetGroup } from './setting-widget-group.model';
// import { SelectOptions } from '@frontend/components';
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

export enum SettingWidgetType {
  GROUP_INFO = 1,
  MODULES,
}

export class SettingWidgetTypeOption {
  value!: SettingWidgetType;
  label!: string;
}

export const settingWidgetType: Array<any> = [
  {
    value: SettingWidgetType.GROUP_INFO,
    label: 'settingWidget.label.group',
  },
  {
    value: SettingWidgetType.MODULES,
    label: 'settingWidget.label.module',
  },
];
