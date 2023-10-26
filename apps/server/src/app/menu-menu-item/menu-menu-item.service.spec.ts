import { Test, TestingModule } from '@nestjs/testing';
import { MenuMenuItemService } from './menu-menu-item.service';

describe('MenuMenuItemService', () => {
  let service: MenuMenuItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuMenuItemService],
    }).compile();

    service = module.get<MenuMenuItemService>(MenuMenuItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
