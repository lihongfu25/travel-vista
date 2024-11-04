import { Test, TestingModule } from '@nestjs/testing';
import { ImageCommonService } from './image-common.service';

describe('ImageCommonService', () => {
  let service: ImageCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageCommonService],
    }).compile();

    service = module.get<ImageCommonService>(ImageCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
