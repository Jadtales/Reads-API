import * as process from 'node:process';

import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

import {ConfigModule, ConfigService} from '@nestjs/config';
import environmentValidation from './config/environment.validation';

// customized environment variables
import appConfiguration from './config/app.configuration';
import databaseConfig from './config/app.database.config';

// imported modules
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {CardsModule} from './cards-management/cards.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {NotificationsModule} from './notifications/notifications.module';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {ClippingsFilesUploadModule} from './clippings-files-upload/clippings-files-upload.module';
import jwtConfig from './auth/config/jwt.config';
import {JwtModule} from '@nestjs/jwt';
import {APP_GUARD} from '@nestjs/core';
import {AccessTokenGuard} from './auth/guards/access.token.guard';
import {AuthenticationGuard} from './auth/guards/authentication.guard';
import { NotificationsGateway } from './notifications/notifications.gateway';

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
        CardsModule,
        NotificationsModule,
        ClippingsFilesUploadModule,

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
export class AppModule {
}
