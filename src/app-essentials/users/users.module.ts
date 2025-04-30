import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';

// Imported Providers
import { UsersService } from './providers/users.service';
import { UserRelationsServices } from './providers/user-relations.service';

// Imported Modules
import { NotecardsModule } from '../../app-features/notecards/notecards.module';
import { NotificationsModule } from '../../app-features/notifications/notifications.module';

// Imported Entities
import { User } from './entities/users.entity';
import { UserRelations } from './entities/user-relations.entity';
import { UserStats } from './entities/user-stats.entity';
import { UsersStatsService } from './providers/user-stats.services';
import { AuthModule } from '../../app-security/auth/auth.module';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUser } from './providers/create-google-user.provider';
import { UserRelationsController } from './controllers/user-relations.controller';
import { UsersStatsController } from './controllers/users-stats.controller';
import { FindUserService } from './utilities/providers/find-user.services';

@Module({
  controllers: [UsersController, UserRelationsController, UsersStatsController],
  imports: [
    forwardRef(() => NotecardsModule),
    forwardRef(() => NotificationsModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, UserRelations, UserStats]),
  ],
  providers: [
    UsersService,
    UserRelationsServices,
    UsersStatsService,
    FindOneByGoogleIdProvider,
    CreateGoogleUser,
    FindUserService,
  ],
  exports: [UsersService, UserRelationsServices, FindUserService, TypeOrmModule],
})
export class UsersModule {}
