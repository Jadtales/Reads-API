import { WebSocketGateway } from '@nestjs/websockets';

import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { NotecardCreationEventInterface } from '../../../app-utils/custom-events/notecard-events';
import { Inject } from '@nestjs/common';
import { UserRelationsServices } from '../../../app-essentials/users/providers/user-relations.service';
import { Notifications_dto } from '../dtos/notifications_dto';
import { NotificationsService } from '../providers/notifications.service';

@WebSocketGateway()
export class NotecardsGateway {
  private server: Server;

  constructor(
    @Inject(UserRelationsServices)
    private readonly userRelationsServices: UserRelationsServices,
    private readonly notificationServices: NotificationsService,
  ) {}

  // to inform subscribes on a notecard creation
  @OnEvent('notecard.created')
  async sendNotecardCreationNotification(
    eventPayload: NotecardCreationEventInterface,
  ): Promise<string> {
    console.log('event ->', eventPayload);

    // fetch user followers
    const followers = await this.userRelationsServices.getFollowers(
      eventPayload.userId,
    );

    // create and send notifications to each follower
    //     for (const follower of followers) {
    //       const notificationMessage: Notifications_dto = {
    //         notificationSenderId: eventPayload.userId,
    //         notificationRecipientId: follower.id,
    //         notifications: [
    //           {
    //             createdAt: Date.now(),
    //             notificationType: 'created',
    //             notificationTitle: eventPayload.notecardTitle,
    //           },
    //         ],
    //       };
    // }
    // const notificationMessage: Notifications_dto = {
    //   notificationSenderId: eventPayload.userId,
    //   notificationRecipientId: '',
    //   notifications: [
    //     {
    //       createdAt: Date.now(),
    //       notificationType: 'created',
    //       notificationTitle: eventPayload.notecardTitle,
    //     },
    //   ],
    // };
    // const createdNotification =
    //   await this.notificationServices.createNotification(notificationMessage);

    this.server.to('joinRoom').emit('newMessage', eventPayload);
    return 'Notification sent';
  }

  // // TODO: a user might get thousands of notifications. Therefore, we need a practical notifications query is needed
  // @SubscribeMessage('getAllNotificationMessages')
  // getAllNotificationMessages(userId: string) {
  //   return this.notificationsService.getUserNotifications(userId);
  // }
  //
  // @SubscribeMessage('sendFollowNotificationMessage')
  // sendFollowNotificationMessage(
  //   @MessageBody() data: { followerId: string; followingId: string },
  // ) {
  //   let followedUser = this.followFollowingRelationServices.followUser(
  //     data.followerId,
  //     data.followingId,
  //   );
  //
  //   this.server.to(data.followingId).emit('follow', followedUser);
  //
  //   return followedUser;
  // }
}
