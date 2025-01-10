import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {NotificationData_dto, Notifications_dto} from '../DTOs/notifications_dto';
import {NotificationUnionType} from '../types/notifications.type'
import {Users} from "../../users/entities/user.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('increment')
    notificationRowId: number;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({name: 'notificationSenderId'})
    notificationSenderId: Users;

    @ManyToOne(() => Users, (user) => user.id)
    @JoinColumn({name: 'notificationRecipientId'})
    notificationRecipientId: Users;

    @Column({type: "boolean", default: false})
    read: boolean;

    @Column({type: 'jsonb', nullable: false})
    notifications: NotificationData_dto[];
}
