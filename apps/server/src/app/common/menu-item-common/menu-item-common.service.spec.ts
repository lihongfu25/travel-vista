import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemCommonService } from './menu-item-common.service';

describe('MenuItemCommonService', () => {
  let service: MenuItemCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuItemCommonService],
    }).compile();

    service = module.get<MenuItemCommonService>(MenuItemCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
