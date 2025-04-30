import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../../../app-essentials/users/entities/users.entity';

@Entity()
export class Notecards {
  @PrimaryGeneratedColumn('increment')
  notecardId?: number;

  @ManyToOne(() => User, (user) => user.userCards)
  notecardCreatorId?: User;

  @CreateDateColumn()
  notecardCreationDate?: Date;

  @Column({ type: 'varchar', nullable: false })
  notecardTitle: string;

  @Column({ type: 'varchar', nullable: true })
  notecardDescription?: string;

  @Column({ type: 'jsonb', nullable: true })
  notecardData: {
    id?: number;
    term: string;
    definition?: string;
    isStared?: boolean;
  }[];

  @Column('jsonb', { nullable: true })
  bookBased: {
    bookTitle?: string;
    bookAuthor?: string;
  };

  @Column({ type: 'text', array: true, nullable: true })
  notecardTags: string[];

  @UpdateDateColumn()
  lastUpdatedDate: Date;

  @Column({ type: 'int', default: 0 })
  notecardLikes: number;

  @Column({ type: 'float', default: 0 })
  notecardRating: number;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({ type: 'boolean', default: true })
  isPublished: boolean;
}
