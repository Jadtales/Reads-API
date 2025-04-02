import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import environmentValidation from './config/environment.validation';

// customized environment variables
import appConfiguration from './config/app.configuration';
import databaseConfig from './config/app.database.config';

// imported modules
import { UsersModule } from './app-essentials/users/users.module';
import { AuthModule } from './app-security/auth/auth.module';
import { NotecardsModule } from './app-features/notecards/notecards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './app-features/notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FilesUploadModule } from './app-features/files-upload/files-upload.module';
import jwtConfig from './app-security/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './app-security/auth/guards/access.token.guard';
import { AuthenticationGuard } from './app-security/auth/guards/authentication.guard';
import { NotificationsGateway } from './app-features/notifications/gateways/notifications.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { NotesModule } from './app-features/notes/notes.module';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !env ? '.env' : `.env.${process.env.NODE_ENV}`,
      load: [appConfiguration, databaseConfig],
      validationSchema: environmentValidation,
    }),

    UsersModule,
    AuthModule,
    NotecardsModule,
    NotificationsModule,
    FilesUploadModule,

    EventEmitterModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get<string>('databaseConfig.database'),
        host: configService.get<string>('databaseConfig.host'),
        port: +configService.get<number>('databaseConfig.port'),
        username: configService.get<string>('databaseConfig.username'),
        password: configService.get<string>('databaseConfig.password'),
        autoLoadEntities: configService.get('databaseConfig.autoLoadEntities'),
        synchronize: configService.get('databaseConfig.synchronize'),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    CacheModule.register({ isGlobal: true, ttl: 600000 }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    NotificationsGateway,
  ],
})
export class AppModule {}
