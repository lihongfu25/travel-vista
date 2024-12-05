import { Test, TestingModule } from '@nestjs/testing';
import { SettingWidgetGroupService } from './setting-widget-group.service';

describe('SettingWidgetGroupService', () => {
  let service: SettingWidgetGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingWidgetGroupService],
    }).compile();

    service = module.get<SettingWidgetGroupService>(SettingWidgetGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
