import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { NoteComment } from '../entities/note-comments.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindUserService } from '../../../app-essentials/users/utilities/providers/find-user.services';
import { Note } from '../entities/note.entity';
import { CommentNoteDTO } from '../dtos/note.dtos';
import { NoteCommentsId } from '../interfaces/note-comments-response.interface';

@Injectable()
export class NoteCommentsServices {
  constructor(
    @InjectRepository(NoteComment)
    private readonly noteCommentsRepository: Repository<NoteComment>,
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    private readonly findUsersProvider: FindUserService,
  ) {}

  // --- helper functions
  // recursively map comments and replies
  private mapComments(comments: NoteComment[]) {
    return comments.map((comment) => ({
      commentId: comment.id,
      commentContent: comment.commentContent,
      commentedByUserId: comment.commentedBy.id,
      commentReplies: comment.replies ? this.mapComments(comment.replies) : [],
    }));
  }

  async commentNote({
    noteId,
    commentedByUserId,
    commentContent,
  }: CommentNoteDTO): Promise<string> {
    const user = await this.findUsersProvider.findUserById(commentedByUserId);
    const note = await this.notesRepository.findOneBy({ id: noteId });

    if (!user || !note) {
      throw new NotFoundException('User/Note not found');
    }

    try {
      const newComment = this.noteCommentsRepository.create({
        commentContent: commentContent,
        note: note,
        commentedBy: user,
      });

      await this.noteCommentsRepository.save(newComment);
    } catch (error) {
      throw new HttpException('Cannot add comment', error);
    }

    return 'Commented';
  }

  async getNoteComments(noteId: string): Promise<NoteCommentsId> {
    const note = await this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.noteComments', 'commentContent')
      .leftJoinAndSelect('comment.commentedBy', 'commentedByUser')
      .leftJoinAndSelect('comment.replies', 'reply')
      .leftJoinAndSelect('reply.commentedBy', 'replyUser')
      .where('note.id = :noteId', { noteId })
      .getOne();

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return {
      noteId: note.id,
      noteByUserId: note.userId,
      noteComments: this.mapComments(note.noteComments),
    };
  }
}
