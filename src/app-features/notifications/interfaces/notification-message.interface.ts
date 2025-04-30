import {NotificationUnionType} from "../types/notifications.type";

export interface NotificationMessageInterface {
    notificationType: NotificationUnionType;
    recipientId: string;
    notificationMessage: string;
}