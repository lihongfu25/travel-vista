import { Module } from '@nestjs/common';
import { FileCommonService } from './file-common.service';

@Module({
  providers: [FileCommonService],
})
export class ImageCommonModule {}
