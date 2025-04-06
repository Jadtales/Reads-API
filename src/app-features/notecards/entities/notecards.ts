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

  @Column({ type: 'varchar', unique: true, nullable: false })
  notecardTitle: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  notecardDescription: string;

  @Column({ type: 'json', nullable: true })
  notecardData: {
    data: {
      id: number;
      term: string | null;
      definition: string | null;
      isStared: boolean;
    }[];
  };

  @Column('simple-array', { nullable: true })
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
