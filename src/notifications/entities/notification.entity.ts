import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationData_dto } from '../DTOs/notifications_dto';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('increment')
  notificationId: number;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  notificationMakerId: string;

  @Column({ type: 'uuid', nullable: false })
  notificationRecipientId: string;

  @Column({ type: 'jsonb', nullable: false })
  notifications: NotificationData_dto[];
}
