import {
  IsArray,
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import {Transform, Type} from 'class-transformer';
import {PrimaryGeneratedColumn} from "typeorm";
import {NotificationUnionType} from "../types/notifications.type";

export class Notifications_dto {
  @IsString()
  @IsNotEmpty()
  notificationSenderId: string;

  @IsString()
  @IsNotEmpty()
  notificationRecipientId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotificationData_dto)
  notifications: NotificationData_dto[];
}

export class NotificationData_dto {
  @IsNumber()
  @IsNotEmpty()
  createdAt: number;

  @IsOptional()
  @IsString()
  notificationType: NotificationUnionType;

  @IsString()
  @IsNotEmpty()
  notificationContent: string;
}