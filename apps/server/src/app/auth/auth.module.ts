import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ServerCommonModule } from '@server/common';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '@server/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    ServerCommonModule,
    JwtModule.register({
      secret: environment.appKey,
      signOptions: { expiresIn: environment.jwtTtl },
    }),
  ],
})
export class AuthModule {}
