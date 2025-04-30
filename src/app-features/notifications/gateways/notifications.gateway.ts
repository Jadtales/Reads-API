import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
} from '@nestjs/websockets';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { validate as isUuid } from 'uuid';

import { NotificationsService } from '../providers/notifications.service';
import { UserRelationsServices } from '../../../app-essentials/users/providers/user-relations.service';
import { CardServices } from '../../notecards/providers/notecards.service';

@Injectable()
@WebSocketGateway({ cors: true })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  // map userId to socketId
  private activeUsers = new Map<string, string>();

  constructor(
    private readonly notificationsService: NotificationsService,
    @Inject(forwardRef(() => UserRelationsServices))
    private readonly followFollowingRelationServices: UserRelationsServices,
    @Inject(forwardRef(() => CardServices))
    private readonly cardsService: CardServices,
  ) {}

  afterInit(server: Server): any {
    this.server = server;

    console.log('websocket server is initialized');
  }

  handleConnection(client: Socket): any {
    const userId = client.handshake.query.userId as string;

    if (userId && isUuid(userId)) {
      this.activeUsers.set(userId, client.id);
      console.log('userId is joined');
    }
  }

  handleDisconnect(client: Socket): void {
    this.activeUsers.delete(client.id);
    console.log('user is disconnected');
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, userId: string): any {
    client.join(userId);

    console.log(this.activeUsers);

    this.activeUsers.set(client.id, userId);
    console.log('user joined');
  }
}
