import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { ServerCommonModule } from '@server/common';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [ServerCommonModule],
})
export class RoleModule {}
