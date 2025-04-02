import { Module, forwardRef } from '@nestjs/common';

// services
import { CardServices } from './providers/notecards.service';
import { NotecardsStatsController } from './controllers/notecards.stats.controller';
import { NotecardsStatsService } from './providers/notecards.stats.service';
import { NotecardsController } from './notecards.controller';
import { Notecards } from './entities/notecards';

import { UsersModule } from '../../app-essentials/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  controllers: [NotecardsController, NotecardsStatsController],
  imports: [
    PaginationModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Notecards]),
    forwardRef(() => NotificationsModule),
    EventEmitterModule.forRoot()
  ],
  providers: [CardServices, NotecardsStatsService],
  exports: [CardServices],
})
export class NotecardsModule {}
