// users.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Exclude} from 'class-transformer'
import { Cards } from '../../cards-management/entities/cards.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Follow } from './follow.entity';
import UploadKindleFile from "../../clippings-files-upload/entities/uploadFile.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 51, unique: true, nullable: false })
  userUsername: string;

  @Column({ type: 'varchar', length: 101, nullable: true })
  userFirstName: string;

  @Column({ type: 'varchar', length: 101, nullable: true })
  userLastName: string;

  @Column({ type: 'int', nullable: true })
  userAge: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  userEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  userPassword?: string;

  @Column({type: 'varchar', nullable: true})
  @Exclude()
  googleId?: string;

  @OneToMany(() => Cards, (cards) => cards.cardCreatorId, { lazy: true })
  userCards?: Cards[] | null;

  @OneToMany(() => UploadKindleFile, (UKFColumn) => UKFColumn.userId)
  userKindleFileUploads: UploadKindleFile;

  // User following others
  @OneToMany(() => Follow, (follow) => follow.follower, { cascade: true })
  following: Follow[]; // Users being followed

  // User's followers
  @OneToMany(() => Follow, (follow) => follow.following, { cascade: true })
  followers: Follow[]; // Users who follow this user
}
