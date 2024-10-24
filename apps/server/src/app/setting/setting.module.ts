import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { ServerCommonModule } from '@server/common';

@Module({
  providers: [SettingService],
  controllers: [SettingController],
  imports: [ServerCommonModule],
})
export class SettingModule {}
