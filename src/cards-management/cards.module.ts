import {Module, forwardRef} from '@nestjs/common';

// services
import {CardServices} from './providers/cards.service';
import {CardsStatsController} from './cards.stats.controller';
import {CardsStatsService} from './providers/cards.stats.service';
import {CardsController} from './cards.controller';
import {Cards} from './entities/cards.entity';

import {UsersModule} from '../users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaginationModule} from '../common/pagination/pagination.module';
import {NotificationsModule} from "../notifications/notifications.module";

@Module({
    controllers: [CardsController, CardsStatsController],
    imports: [
        PaginationModule,
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([Cards]),
        forwardRef(() => NotificationsModule)
    ],
    providers: [CardServices, CardsStatsService],
    exports: [CardServices],
})
export class CardsModule {
}
