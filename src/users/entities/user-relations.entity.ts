import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UserRelations {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Users that follow a user
  @ManyToOne(() => Users, (user) => user.following, {onDelete: 'CASCADE' })
  follower: Users;

  // a user that follows others
  @ManyToOne(() => Users, (user) => user.followers, {onDelete: 'CASCADE' })
  following: Users;
}
