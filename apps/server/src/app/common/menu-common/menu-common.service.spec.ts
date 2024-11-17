import { Test, TestingModule } from '@nestjs/testing';
import { MenuCommonService } from './menu-common.service';

describe('MenuCommonService', () => {
  let service: MenuCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuCommonService],
    }).compile();

    service = module.get<MenuCommonService>(MenuCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
