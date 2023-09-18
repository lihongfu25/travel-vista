import { Module } from '@nestjs/common';
import { SharedDatabaseModule } from '@server/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SERVER_CONFIGURATION, environment } from '@server/configuration';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SharedDatabaseModule.register({
      entities: [],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: SERVER_CONFIGURATION, useValue: environment },
  ],
})
export class AppModule {}
