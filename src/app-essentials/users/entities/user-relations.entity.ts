import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class UserRelations {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Users that follow a user
  @ManyToOne(() => User, (user) => user.following, {onDelete: 'CASCADE' })
  follower: User;

  // a user that follows others
  @ManyToOne(() => User, (user) => user.followers, {onDelete: 'CASCADE' })
  following: User;
}
