import {
  Column,
  Entity, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from '../../../app-essentials/users/entities/users.entity';
import { Note } from './note.entity';

@Entity()
export class NoteComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  commentedBy: User;

  @Column({ type: 'text', nullable: false })
  commentContent: string;

  @ManyToOne(() => Note, (note) => note.noteComments, { onDelete: 'CASCADE' })
  note: Note;

  @ManyToOne(
    () => NoteComment,
    (commentedNote) => commentedNote.parentComment,
    {nullable: true, onDelete: 'CASCADE' }
  )
  parentComment?: NoteComment;

  @OneToMany(() => NoteComment, (noteComment) => noteComment.parentComment, {
    nullable: true,
  })
  replies?: NoteComment[];

  @ManyToMany(() => User, (user) => user.id, { nullable: true, eager: true })
  @JoinTable({
    name: 'user_liked_comments',
    joinColumn: {name: 'commentId', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'userId', referencedColumnName: 'id'},
  })
  likedBy: User[];
}
