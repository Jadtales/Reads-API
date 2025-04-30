import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Notecards } from '../../../app-features/notecards/entities/notecards';

@Entity()
export class UserStats {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Notecards)
  @JoinColumn()
  userCardCreatorId: Notecards;

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
