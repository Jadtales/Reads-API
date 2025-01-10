import { Module , forwardRef }from '@nestjs/common';
import { ClippingsFilesUploadService } from './providers/clippings-files-upload.service';
import { ClippingsFilesUploadController } from './clippings-files-upload.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import UploadKindleFile from "./entities/uploadFile.entity";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [ClippingsFilesUploadController],
  providers: [ClippingsFilesUploadService],
  imports: [
      forwardRef(() => UsersModule),
      TypeOrmModule.forFeature([UploadKindleFile]),
  ]
})
export class ClippingsFilesUploadModule {}
