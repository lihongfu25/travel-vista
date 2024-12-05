import { Test, TestingModule } from '@nestjs/testing';
import { SettingWidgetService } from './setting-widget.service';

describe('SettingWidgetService', () => {
  let service: SettingWidgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingWidgetService],
    }).compile();

    service = module.get<SettingWidgetService>(SettingWidgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
