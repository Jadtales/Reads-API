import {Module, forwardRef} from '@nestjs/common';

// services
import {CardServices} from './providers/notecards.service';
import {NotecardsStatsController} from './controllers/notecards.stats.controller';
import {CardsStatsService} from './providers/cards.stats.service';
import {NotecardsController} from './notecards.controller';
import {Notecards} from './entities/notecards';

import {UsersModule} from '../users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaginationModule} from '../common/pagination/pagination.module';
import {NotificationsModule} from "../notifications/notifications.module";

@Module({
    controllers: [NotecardsController, NotecardsStatsController],
    imports: [
        PaginationModule,
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([Notecards]),
        forwardRef(() => NotificationsModule)
    ],
    providers: [CardServices, CardsStatsService],
    exports: [CardServices],
})
export class NotecardsModule {
}
