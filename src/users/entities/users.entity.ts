// users.entity.ts
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Exclude} from 'class-transformer'
import {Notecards} from '../../notecards/entities/notecards';
import {Notification} from '../../notifications/entities/notification.entity';
import {UserRelations} from './user-relations.entity';
import KindleHighlightsFile from "../../files-upload/entities/kindle-highlights.file";
import {ParseUUIDPipe} from "@nestjs/common";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 51, unique: true, nullable: false})
    userUsername: string;

    @Column({type: 'varchar', length: 101, nullable: true})
    userFirstName: string;

    @Column({type: 'varchar', length: 101, nullable: true})
    userLastName: string;

    @Column({type: 'int', nullable: true})
    userAge: number;

    @Column({type: 'varchar', unique: true, nullable: false})
    userEmail: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    @Exclude()
    userPassword?: string;

    @Column({type: 'varchar', nullable: true})
    @Exclude()
    googleId?: string;

    @OneToMany(() => Notecards, (cards) => cards.cardCreatorId, {lazy: true})
    userCards?: Notecards[] | null;

    @OneToMany(() => KindleHighlightsFile, (UKFColumn) => UKFColumn.userId)
    userKindleFileUploads: KindleHighlightsFile;

    // User following others
    @OneToMany(() => UserRelations, (follow) => follow.follower, {cascade: true})
    following: UserRelations[]; // Users being followed

    // User's followers
    @OneToMany(() => UserRelations, (follow) => follow.following, {cascade: true})
    followers: UserRelations[]; // Users who follow this user
}
