import { Module } from '@nestjs/common';
import { SERVER_CONFIGURATION, environment } from '@server/configuration';
import { SharedDatabaseModule } from '@server/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { MenuItem } from './menu-item/menu-item.entity';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuMenuItem } from './menu-menu-item/menu-menu-item.entity';
import { MenuMenuItemModule } from './menu-menu-item/menu-menu-item.module';
import { Menu } from './menu/menu.entity';
import { MenuModule } from './menu/menu.module';
import { PasswordReset } from './password-reset/password-reset.entity';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { Role } from './role/role.entity';
import { RoleModule } from './role/role.module';
import { SettingWidgetGroup } from './setting-widget-group/setting-widget-group.entity';
import { SettingWidgetGroupModule } from './setting-widget-group/setting-widget-group.module';
import { SettingWidget } from './setting-widget/setting-widget.entity';
import { SettingWidgetModule } from './setting-widget/setting-widget.module';
import { Setting } from './setting/setting.entity';
import { SettingModule } from './setting/setting.module';
import { UserRole } from './user-role/user-role.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SharedDatabaseModule.register({
      entities: [
        User,
        Role,
        UserRole,
        PasswordReset,
        Menu,
        MenuItem,
        MenuMenuItem,
        Setting,
        SettingWidgetGroup,
        SettingWidget,
      ],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PasswordResetModule,
    FileModule,
    MenuModule,
    MenuItemModule,
    MenuMenuItemModule,
    SettingModule,
    SettingWidgetGroupModule,
    SettingWidgetModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: SERVER_CONFIGURATION, useValue: environment },
  ],
})
export class AppModule {}
