import { Module , forwardRef }from '@nestjs/common';
import { KindleHighlightsFileUploadService } from './providers/kindle-highlights-file-upload.service';
import { FilesUploadController } from './files-upload.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import KindleHighlightsFile from "./entities/kindle-highlights.file";
import {UsersModule} from "../users/users.module";
import {UserProfilePictureUploadService} from "./providers/user-pp-img-upload.service";
import {FindUserService} from "../users/utilities/providers/find-user.services";
import {ExtractKindleHighlightsServiceUtil} from "./utilities/providers/extract-kindle-highlights-service";

@Module({
  controllers: [FilesUploadController],
  providers: [KindleHighlightsFileUploadService, UserProfilePictureUploadService, ExtractKindleHighlightsServiceUtil],
  imports: [
      UsersModule,
      TypeOrmModule.forFeature([KindleHighlightsFile]),
  ]
})
export class FilesUploadModule {}
