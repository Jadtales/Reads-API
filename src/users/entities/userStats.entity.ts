import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cards } from '../../cards-management/entities/cards.entity';

@Entity()
export class UserStats {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cards)
  @JoinColumn()
  userCardCreatorId: Cards;

  @Column({ type: 'int', nullable: true })
  numberOfCreatedCards: number;

  @Column({ type: 'int', nullable: true })
  percentageOfActiveTime: number;

  @Column({ type: 'int', nullable: true })
  streaks: number;

  @Column({ type: 'int', nullable: true })
  totalInteractions: number;

  @Column({ type: 'int', nullable: true })
  cardsEngagementRate: number;

  @Column({ type: 'int', nullable: true })
  cardRating: number;
}
