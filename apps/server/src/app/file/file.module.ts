import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ServerCommonModule } from '@server/common';
import { ServerConfigurationModule } from '@server/configuration';

@Module({
  providers: [FileService],
  controllers: [FileController],
  imports: [ServerCommonModule, ServerConfigurationModule],
})
export class FileModule {}
