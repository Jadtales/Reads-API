import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Equal } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import {
  NotificationData_dto,
  Notifications_dto,
} from '../dtos/notifications_dto';
import { UsersService } from '../../../app-essentials/users/providers/users.service';
import { UserRelationsServices } from '../../../app-essentials/users/providers/user-relations.service';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => UserRelationsServices))
    private readonly followFollowingRelationServices: UserRelationsServices,
  ) {}

  async getUserNotifications(userId: string): Promise<Notification[]> {
    // check if the user exists
    const doesUserExist = await this.usersService.findUserById(userId);

    if (!doesUserExist) throw new NotFoundException('User not found');

    const doesUserHaveNotifications = await this.notificationsRepository.find({
      where: { notificationRecipientId: Equal(doesUserExist.id) },
    });

    if (doesUserHaveNotifications) {
      // query all notifications of The Recipient
      return await this.notificationsRepository
        .createQueryBuilder('notification')
        .where('notifications.notificationRecipientId = :userId', {
          userId: doesUserExist.id,
        })
        .andWhere('notification.notifications::jsonb @> :filter', {
          filter: JSON.stringify([{ type: 'like' }]),
        })
        .orderBy('notification.createdAt', 'DESC')
        .getMany();
    } else {
      return [];
    }
  }

  // --- handling received events
  async createNotification(
    notificationMessage: Notifications_dto,
  ): Promise<Notification> {
    // save received notifications in the database
    let notification;
    try {
      notification = this.notificationsRepository.create({
        ...notificationMessage,
        notificationRecipientId: {
          id: notificationMessage.notificationRecipientId,
        },
        notificationSenderId: { id: notificationMessage.notificationSenderId },
      });
      await this.notificationsRepository.save(notification);
    } catch (error) {
      throw new InternalServerErrorException(error, 'Unable to save in db');
    }

    return notification;
  }

  async createNotificationForMany(
    senderId: string,
    notificationMessage: NotificationData_dto,
  ) {
    // fetch user followers
    const userFollowers =
      await this.followFollowingRelationServices.getFollowers(senderId);

    if (!userFollowers || userFollowers.length === 0) {
      throw new NotFoundException('No followers found for this user');
    }

    // create notification in batch
    const notifications = userFollowers.map((follower) => ({
      ...notificationMessage,
      notificationRecipientId: { id: follower.id },
      notificationSenderId: { id: senderId },
    }));

    await this.notificationsRepository.save(notifications);

    // push real-time notification
    // this.notificationGateway.sendNotification(
    //     userFollowers.map((follower) => follower.id),
    //     notificationMessage,
    // );
  }
}
