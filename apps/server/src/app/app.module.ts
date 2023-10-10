import { Module } from '@nestjs/common';
import { SERVER_CONFIGURATION, environment } from '@server/configuration';
import { SharedDatabaseModule } from '@server/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordReset } from './password-reset/password-reset.entity';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { UserRole } from './user-role/user-role.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    SharedDatabaseModule.register({
      entities: [User, Role, UserRole, PasswordReset],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PasswordResetModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: SERVER_CONFIGURATION, useValue: environment },
  ],
})
export class AppModule {}
