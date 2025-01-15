import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Setting } from './setting.entity';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { OptionSelect } from './types';
import { ControlType } from './enums';

@Injectable()
export class SettingService extends BaseService<Setting> {
  public entity: EntityTarget<Setting> = Setting;
  public repository: Repository<Setting> =
    this.dataSource.getRepository(Setting);
  constructor(private dataSource: DataSource) {
    super();
  }

  getControlTypes(): Array<OptionSelect> {
    return [
      {
        label: 'Input',
        value: ControlType.INPUT,
      },
      {
        label: 'Number',
        value: ControlType.NUMBER,
      },
      {
        label: 'Email',
        value: ControlType.EMAIL,
      },
      {
        label: 'Checkbox',
        value: ControlType.CHECKBOX,
      },
      {
        label: 'Radio',
        value: ControlType.RADIO,
      },
      {
        label: 'Select',
        value: ControlType.SELECT,
      },
      {
        label: 'Textarea',
        value: ControlType.TEXTAREA,
      },
      {
        label: 'Date',
        value: ControlType.DATE,
      },
      {
        label: 'Time',
        value: ControlType.TIME,
      },
      {
        label: 'Datetime',
        value: ControlType.DATETIME,
      },
      {
        label: 'Image',
        value: ControlType.IMAGE,
      },
      {
        label: 'Text Editor',
        value: ControlType.TEXT_EDITOR,
      },
      {
        label: 'Password',
        value: ControlType.PASSWORD,
      },
      {
        label: 'File',
        value: ControlType.FILE,
      },
    ];
  }
}
