import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { FindUserService } from '../../app-essentials/users/utilities/providers/find-user.services';
import { PostNoteDTO } from './dtos/note.dtos';
import { NoteInfosInterface } from './interfaces/note-interfaces';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { PaginationInterface } from '../../common/interfaces/pagination.interface';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    private readonly findUserService: FindUserService,
    private readonly paginationProvider: PaginationProvider,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async likeNote(userId: string, noteId: string): Promise<string> {
    const user = await this.findUserService.findUserById(userId);

    if (!user) {
      return;
    }

    const note = await this.notesRepository.findOneBy({ id: noteId });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const existingLike = await this.notesRepository
      .createQueryBuilder('note')
      .innerJoin('note.likedBy', 'liker', 'liker.id = :userId', { userId })
      .where('note.id = :noteId', { noteId })
      .getOne();

    let action: string; // todo: check note's like status on database level

    if (existingLike) {
      await this.notesRepository
        .createQueryBuilder()
        .relation('Note', 'likedBy')
        .of(noteId)
        .remove(userId);

      action = 'unliked';
    } else {
      await this.notesRepository
        .createQueryBuilder()
        .relation('Note', 'likedBy')
        .of(noteId)
        .add(userId);

      action = 'liked';
    }

    // todo: Must return `${user.username} Note is liked.`
    return `${user.userUsername} ${action} note ${note.id}`;
  }

  async postNote(note: PostNoteDTO): Promise<number> {
    const doesUserExist = await this.findUserService.findUserById(note.userId);

    const mentionedUsers = await this.findUserService.findUsersById(
      note.mentionedUsers,
    );

    console.log(mentionedUsers);

    let newNote;

    if (doesUserExist) {
      newNote = this.notesRepository.create({
        ...note,
        mentionedUsers: mentionedUsers,
      });
    }

    try {
      await this.notesRepository.save(newNote);
    } catch (error) {
      throw new NotFoundException(error);
    }

    return HttpStatus.ACCEPTED;
  }

  // -- Notes retrieval
  async getNoteInfo(noteId: string): Promise<NoteInfosInterface> {
    console.log(noteId);

    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: ['sharedBy', 'likedBy', 'noteComments'],
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return {
      noteId: note.id,
      noteLikes: Array.isArray(note.likedBy) ? note.likedBy.length : 0,
      noteShares: Array.isArray(note.sharedBy) ? note.sharedBy.length : 0,
      noteComments: Array.isArray(note.noteComments)
        ? note.noteComments.length
        : 0,
    };
  }

  async getUserNotes(userId: string): Promise<PaginationInterface<Note>> {
    await this.findUserService.findUserById(userId);

    const cachedNotes =
      await this.cacheManager.get<PaginationInterface<Note>>('userNotes');

    if (cachedNotes) {
      return cachedNotes;
    }

    const notes = await this.paginationProvider.paginateQuery(
      { limit: 20, page: 1 },
      this.notesRepository,
      {},
    );

    await this.cacheManager.set<PaginationInterface<Note>>('userNotes', notes);

    return notes;
  }
}
