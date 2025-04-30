import { Module } from '@nestjs/common';
import { SharedContentService } from './shared-content.service';
import { SharedContentController } from './shared-content.controller';
import { UsersModule } from '../../app-essentials/users/users.module';
import { NotesModule } from '../notes/notes.module';
import { NotecardsModule } from '../notecards/notecards.module';
import { FilesUploadModule } from "../files-upload/files-upload.module";

@Module({
  controllers: [SharedContentController],
  providers: [SharedContentService],
  imports: [UsersModule, NotesModule, NotecardsModule, FilesUploadModule],
})
export class SharedContentModule {}
