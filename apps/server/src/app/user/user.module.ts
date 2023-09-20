import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ServerCommonModule } from '@server/common';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [ServerCommonModule],
})
export class UserModule {}
