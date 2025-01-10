import {Module, forwardRef} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersController} from './users.controller';

// Imported Providers
import {UsersService} from './providers/users.service';
import {FollowFollowingRelationServices} from './providers/follow_following_relation_service';

// Imported Modules
import {CardsModule} from '../cards-management/cards.module';
import {NotificationsModule} from '../notifications/notifications.module';

// Imported Entities
import {Users} from './entities/user.entity';
import {Follow} from './entities/follow.entity';
import {UserStats} from './entities/userStats.entity';
import {UsersStatsService} from './providers/users.stats.services';
import {AuthModule} from '../auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import jwtConfig from '../auth/config/jwt.config';
import {JwtModule} from '@nestjs/jwt';
import {FindOneByGoogleIdProvider} from './providers/find-one-by-google-id.provider';
import {CreateGoogleUser} from "./providers/create-google-user.provider";
import {FollowFollowingRelationController} from './controllers/follow-following-relation.controller';
import {UsersStatsController} from './controllers/users-stats.controller';

@Module({
    controllers: [UsersController, FollowFollowingRelationController, UsersStatsController],
    imports: [
        forwardRef(() => CardsModule),
        forwardRef(() => NotificationsModule),
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([Users, Follow, UserStats]),
    ],
    providers: [UsersService, FollowFollowingRelationServices, UsersStatsService, FindOneByGoogleIdProvider, CreateGoogleUser],
    exports: [UsersService, FollowFollowingRelationServices],
})
export class UsersModule {
}
