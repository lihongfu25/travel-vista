import { Test, TestingModule } from '@nestjs/testing';
import { SettingWidgetGroupController } from './setting-widget-group.controller';

describe('SettingWidgetGroupController', () => {
  let controller: SettingWidgetGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingWidgetGroupController],
    }).compile();

    controller = module.get<SettingWidgetGroupController>(
      SettingWidgetGroupController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
