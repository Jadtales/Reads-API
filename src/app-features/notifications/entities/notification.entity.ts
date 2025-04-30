import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {NotificationData_dto, Notifications_dto} from '../dtos/notifications_dto';
import {NotificationUnionType} from '../types/notifications.type'
import {User} from "../../../app-essentials/users/entities/users.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('increment')
    notificationRowId: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'notificationSenderId'})
    notificationSenderId: User;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'notificationRecipientId'})
    notificationRecipientId: User;

    @Column({type: "boolean", default: false})
    read: boolean;

    @Column({type: 'jsonb', nullable: false})
    notifications: NotificationData_dto[];
}
