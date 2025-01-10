import {forwardRef, Module} from '@nestjs/common';

import {NotificationsService} from './providers/notifications.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Notification} from './entities/notification.entity';
import {UsersModule} from '../users/users.module';
import {NotificationsGateway} from './notifications.gateway';
import {CardsModule} from "../cards-management/cards.module";

@Module({
    controllers: [],
    providers: [NotificationsService, NotificationsGateway],
    imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => CardsModule),
        TypeOrmModule.forFeature([Notification]),
    ],
    exports: [NotificationsService],
})
export class NotificationsModule {
}
