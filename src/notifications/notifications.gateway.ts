import {
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    SubscribeMessage, MessageBody
} from '@nestjs/websockets';

import {forwardRef, Inject, Injectable} from "@nestjs/common";

import {Server, Socket} from 'socket.io'
import {validate as isUuid} from 'uuid';
import {NotificationData_dto, Notifications_dto} from "./dtos/notifications_dto";

import {NotificationsService} from "./providers/notifications.service";
import {UserRelationsServices} from "../users/providers/user-relations.service";
import {CardServices} from "../notecards/providers/notecards.service";
import {CardCreationDTO} from "../notecards/dtos/cards.creation.dto";
import {ActiveUserInterface} from "../auth/interfaces/active-user.interface";

@Injectable()
@WebSocketGateway({cors: true})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly notificationsService: NotificationsService,

        @Inject(forwardRef(() => UserRelationsServices))
        private readonly followFollowingRelationServices: UserRelationsServices,

        @Inject(forwardRef(() => CardServices))
        private readonly cardsService: CardServices,
    ) {
    }

    @WebSocketServer()
    server: Server;

    // map userId to socketId
    private activeUsers = new Map<string, string>();

    handleConnection(client: Socket): any {
        const userId = client.handshake.query.userId as string;

        if (userId && isUuid(userId)) {
            this.activeUsers.set(userId, client.id);
        }
    };

    handleDisconnect(client: Socket): void {
        const userId = [...this.activeUsers.entries()]
            .find(([_, socketId]) => socketId === client.id)?.[0];

        if (userId) {
            this.activeUsers.delete(userId);
        }
    };

    @SubscribeMessage('notecardNotification')
    async sendNotecardCreationNotificationMessage(@MessageBody() createNoteCard: CardCreationDTO,
                                                  userPermission: ActiveUserInterface): Promise<string> {

        let createdNotecard = await this.cardsService.createNoteCard(createNoteCard, userPermission);

        // fetch user followers
        const followers = await this.followFollowingRelationServices.getFollowers(userPermission.userId);

        // create and send notifications to each follower
        for (const follower of followers) {
            const notificationMessage: Notifications_dto = {
                notificationSenderId: userPermission.userId,
                notificationRecipientId: follower.id,
                notifications: [{
                    createdAt: Date.now(),
                    notificationType: 'created',
                    notificationContent: createdNotecard
                }]

            };

            const createdNotification = await this.notificationsService.createNotification(notificationMessage);
            this.server.to(follower.id).emit('newMessage', createdNotification);
        }

        return createdNotecard;
    }

    // TODO: a user might get thousands of notifications. Therefore, we a practical notifications query is needed
    @SubscribeMessage('getAllNotificationMessages')
    getAllNotificationMessages(userId: string) {
        return this.notificationsService.getUserNotifications(userId)
    }

    @SubscribeMessage('sendFollowNotificationMessage')
    sendFollowNotificationMessage(@MessageBody() data: { followerId: string, followingId: string }) {
        let followedUser = this.followFollowingRelationServices.followUser(data.followerId, data.followingId);

        this.server.to(data.followingId).emit('follow', followedUser);

        return followedUser;
    }

}
