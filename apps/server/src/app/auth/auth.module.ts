import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ServerCommonModule } from '@server/common';
import { JwtModule } from '@nestjs/jwt';
import { ServerConfigurationModule, environment } from '@server/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordResetService } from '../password-reset/password-reset.service';

@Module({
  providers: [AuthService, JwtStrategy, PasswordResetService],
  controllers: [AuthController],
  imports: [
    ServerCommonModule,
    ServerConfigurationModule,
    JwtModule.register({
      secret: environment.appKey,
      signOptions: { expiresIn: environment.jwtTtl },
    }),
  ],
})
export class AuthModule {}
