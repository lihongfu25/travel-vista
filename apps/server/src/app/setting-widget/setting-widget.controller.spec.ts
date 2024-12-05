import { Test, TestingModule } from '@nestjs/testing';
import { SettingWidgetController } from './setting-widget.controller';

describe('SettingWidgetController', () => {
  let controller: SettingWidgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingWidgetController],
    }).compile();

    controller = module.get<SettingWidgetController>(SettingWidgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
