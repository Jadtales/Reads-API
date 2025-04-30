import { Module } from '@nestjs/common';
import { KindleHighlightsFileUploadService } from './providers/kindle-highlights-file-upload.service';
import { FilesUploadController } from './controllers/files-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import KindleHighlightsFile from './entities/kindle-highlights.file';
import { UsersModule } from '../../app-essentials/users/users.module';
import { UserProfilePictureUploadService } from './providers/user-pp-img-upload.service';
import { ExtractKindleHighlightsServiceUtil } from './utilities/providers/extract-kindle-highlights-service';
import { KindleHighlightsController } from './controllers/kindle-highlights.controller';
import { KindleBooksServices } from "./providers/kindle-books.service";

@Module({
  controllers: [FilesUploadController, KindleHighlightsController],
  providers: [
    KindleHighlightsFileUploadService,
    UserProfilePictureUploadService,
    ExtractKindleHighlightsServiceUtil,
    KindleBooksServices
  ],
  imports: [UsersModule, TypeOrmModule.forFeature([KindleHighlightsFile])],
  exports: [TypeOrmModule],
})
export class FilesUploadModule {}
