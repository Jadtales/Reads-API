import { forwardRef, Module } from '@nestjs/common';

import { NotificationsService } from './providers/notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from '../../app-essentials/users/users.module';
import { NotificationsGateway } from './gateways/notifications.gateway';
import { NotecardsModule } from '../notecards/notecards.module';
import { NotecardsGateway } from "./gateways/notecards.gateway";

@Module({
  controllers: [],
  providers: [NotificationsService, NotificationsGateway, NotecardsGateway],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => NotecardsModule),
    TypeOrmModule.forFeature([Notification]),
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
