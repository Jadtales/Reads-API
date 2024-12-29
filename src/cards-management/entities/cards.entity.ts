import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Users } from '../../users/entities/user.entity';

@Entity()
export class Cards {
  @PrimaryGeneratedColumn('increment')
  cardId?: number;

  @ManyToOne(() => Users, (user) => user.userCards)
  cardCreatorId?: Users;

  @CreateDateColumn()
  cardCreationDate?: Date;

  @Column({ type: 'varchar', unique: true, nullable: false })
  cardTitle: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  cardDescription: string;

  @Column({ type: 'json', nullable: true })
  cardData: {
    data: {
      term: string | null;
      definition: string | null;
      isStared: boolean;
    }[];
  };

  @Column('simple-array', { nullable: true })
  cardTags: string[];

  @UpdateDateColumn()
  lastUpdatedDate: Date;

  @Column({ type: 'int', default: 0 })
  cardLikes: number; // Number of likes

  @Column({ type: 'float', default: 0 })
  cardRating: number; // Average rating (e.g., out of 5)

  @Column({ type: 'int', default: 0 })
  viewCount: number; // To tracks how many times the card has been viewed

  @Column({ type: 'boolean', default: true })
  isPublished: boolean; // True if the card is published
}
