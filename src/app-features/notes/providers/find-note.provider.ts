import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindNoteProvider {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async getNoteById(noteId: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({id: noteId});

    if (note) return note;
  }
}
