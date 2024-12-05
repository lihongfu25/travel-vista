import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SettingWidgetGroup } from '../setting-widget-group/setting-widget-group.entity';

@Entity({ name: 'settingWidget' })
export class SettingWidget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  settingWidgetGroupId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  icon: string;

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

  @ManyToOne(
    () => SettingWidgetGroup,
    (settingWidgetGroup) => settingWidgetGroup.settingWidgets
  )
  @JoinColumn({ name: 'settingWidgetGroupId' })
  settingWidgetGroup: SettingWidgetGroup;
}
