import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SettingWidget } from '../setting-widget/setting-widget.entity';

@Entity({ name: 'settingWidgetGroup' })
export class SettingWidgetGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sort: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public updatedAt: Date;

  @OneToMany(
    () => SettingWidget,
    (settingWidget) => settingWidget.settingWidgetGroup
  )
  settingWidgets: SettingWidget[];
}
