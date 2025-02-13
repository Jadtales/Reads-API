import {forwardRef, Module} from '@nestjs/common';

import {NotificationsService} from './providers/notifications.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Notification} from './entities/notification.entity';
import {UsersModule} from '../users/users.module';
import {NotificationsGateway} from './notifications.gateway';
import {NotecardsModule} from "../notecards/notecards.module";

@Module({
    controllers: [],
    providers: [NotificationsService, NotificationsGateway],
    imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => NotecardsModule),
        TypeOrmModule.forFeature([Notification]),
    ],
    exports: [NotificationsService],
})
export class NotificationsModule {
}
