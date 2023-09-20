import { Module } from '@nestjs/common';
import { SERVER_CONFIGURATION, environment } from '@server/configuration';
import { SharedDatabaseModule } from '@server/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SharedDatabaseModule.register({
      entities: [User, Role],
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: SERVER_CONFIGURATION, useValue: environment },
  ],
})
export class AppModule {}
