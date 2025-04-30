import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { NoteComment } from './note-comments.entity';
import { User } from '../../../app-essentials/users/entities/users.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'text', default: 'Note' })
  contentType: string;

  @Column({ type: 'text', array: true, nullable: true, default: [] })
  tags: string[];

  @Column({ type: 'text' })
  noteContent: string;

  @ManyToMany(() => User, (user) => user.id, { nullable: true, eager: true })
  @JoinTable({
    name: 'note_liked_by_users',
    joinColumn: { name: 'noteId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  likedBy: User[];

  @ManyToMany(() => User, (user) => user.id, { nullable: true, eager: true })
  @JoinTable({
    name: 'note_shared_by_users',
    joinColumn: { name: 'noteId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  sharedBy: User[];

  @OneToMany(() => NoteComment, (noteComment) => noteComment.note, {
    nullable: true,
    eager: true,
  })
  noteComments: NoteComment[];

  @Column({ type: 'text', array: true, nullable: true, default: [] })
  mentionedBooks?: string[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  mentionedUsers?: User[];
}
