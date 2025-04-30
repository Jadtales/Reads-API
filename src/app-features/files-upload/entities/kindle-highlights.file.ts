import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../app-essentials/users/entities/users.entity';
import { HighlightsInterface } from '../interfaces/highlights-interface';

@Entity()
export default class KindleHighlightsFile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.userKindleFileUploads, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @CreateDateColumn({ nullable: false })
  uploadDate?: Date;

  @Column({ type: 'jsonb', nullable: false, name: 'file' })
  highlights: {
    highlights: HighlightsInterface[];
    exceptions: string[];
  };
}
