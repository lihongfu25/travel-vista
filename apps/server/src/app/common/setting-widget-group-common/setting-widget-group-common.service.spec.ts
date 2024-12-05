import { Test, TestingModule } from '@nestjs/testing';
import { SettingWidgetGroupCommonService } from './setting-widget-group-common.service';

describe('SettingWidgetGroupCommonService', () => {
  let service: SettingWidgetGroupCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingWidgetGroupCommonService],
    }).compile();

    service = module.get<SettingWidgetGroupCommonService>(
      SettingWidgetGroupCommonService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
