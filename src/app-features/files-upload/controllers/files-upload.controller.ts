import {
  Controller,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { KindleHighlightsFileUploadService } from '../providers/kindle-highlights-file-upload.service';

import { AuthAccessType } from '../../../app-security/auth/decorators/auth-access.type';
import { AuthTypeEnum } from '../../../app-security/auth/enums/auth-type.enum';
import { UserProfilePictureUploadService } from '../providers/user-pp-img-upload.service';

@Controller('upload')
export class FilesUploadController {
  constructor(
    private readonly kindleFilesUploadService: KindleHighlightsFileUploadService,
    private readonly userProfilePictureUploadService: UserProfilePictureUploadService,
  ) {}

  @Post('kindle-file/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @AuthAccessType(AuthTypeEnum.Bearer)
  uploadUserKindleFiles(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'text/plain' })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: 'File must be less than 5MB',
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.kindleFilesUploadService.uploadKindleHighlights(userId, file);
  }

  @Post('user-pp/:userId')
  @UseInterceptors(FileInterceptor('image'))
  @AuthAccessType(AuthTypeEnum.Bearer)
  uploadUserProfilePicture(
    @Param('userId', ParseUUIDPipe) userId: string,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    img: Express.Multer.File,
  ) {
    return this.userProfilePictureUploadService.uploadUserProfilePicture(
      userId,
      img,
    );
  }

  @Get('/fetch-user-files/:userId')
  @AuthAccessType(AuthTypeEnum.Bearer)
  getUserFiles(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.kindleFilesUploadService.getUserFiles(userId);
  }
}
