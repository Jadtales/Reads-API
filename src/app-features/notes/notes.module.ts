import { Module } from "@nestjs/common";
import { NotesService } from './notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersModule } from '../../app-essentials/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteComment } from './entities/note-comments.entity';
import { PaginationModule } from "../../common/pagination/pagination.module";
import { NoteCommentsServices } from "./providers/note-comments.provider";

@Module({
  controllers: [NotesController],
  providers: [NotesService, NoteCommentsServices],
  imports: [
    UsersModule,
    PaginationModule,
    TypeOrmModule.forFeature([Note, NoteComment])
  ],
  exports: [TypeOrmModule]

})
export class NotesModule {}
