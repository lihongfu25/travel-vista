import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServerCommonModule } from '@server/common';
import { ServerConfigurationModule } from '@server/configuration';
import { FileCommonService } from '../common/file-common/file-common.service';

@Module({
  providers: [FileService, FileCommonService],
  controllers: [FileController],
  imports: [ServerCommonModule, ServerConfigurationModule],
})
export class FileModule {}
