import { Exclude } from 'class-transformer';

export class SettingTransformer {
  id: string;
  category: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SettingMinimalTransformer {
  id: string;
  @Exclude()
  category: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}
