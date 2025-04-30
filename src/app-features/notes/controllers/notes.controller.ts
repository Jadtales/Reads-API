import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from '../notes.service';
import { CommentNoteDTO, LikeNoteDTO, PostNoteDTO } from '../dtos/note.dtos';
import { AuthAccessType } from '../../../app-security/auth/decorators/auth-access.type';
import { AuthTypeEnum } from '../../../app-security/auth/enums/auth-type.enum';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { NoteCommentsServices } from '../providers/note-comments.provider';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly noteCommentsServices: NoteCommentsServices,
  ) {}

  // --- Note functionalities
  @Post('post-note')
  postNote(@Body() noteDTO: PostNoteDTO) {
    return this.notesService.postNote(noteDTO);
  }

  @Post('like-unlike-note')
  likeNote(@Body() { noteId, likedByUserId }: LikeNoteDTO): Promise<string> {
    return this.notesService.likeNote(likedByUserId, noteId);
  }

  @Post('comment-note')
  commentNote(@Body() commentNoteDTO: CommentNoteDTO) {
    return this.noteCommentsServices.commentNote(commentNoteDTO);
  }

  // --- Note retrieval
  @Get('note-info/:id')
  @AuthAccessType(AuthTypeEnum.None)
  getNoteInfo(@Param('id', ParseUUIDPipe) noteId: string) {
    return this.notesService.getNoteInfo(noteId);
  }

  @CacheKey('user-notes')
  @CacheTTL(5000)
  @Get('user-notes/:userId')
  @AuthAccessType(AuthTypeEnum.None)
  getUserNotes(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notesService.getUserNotes(userId);
  }

  @CacheKey('note-comments')
  @CacheTTL(5000)
  @Get('note-comments/:noteId')
  @AuthAccessType(AuthTypeEnum.None)
  getNoteComments(@Param('id', ParseUUIDPipe) noteId: string) {
    return this.noteCommentsServices.getNoteComments(noteId);
  }
}
