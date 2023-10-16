import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Module({
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
